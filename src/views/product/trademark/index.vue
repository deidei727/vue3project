<template>
    <el-card style="margin:10px 0px">
        <el-button type="primary" size="default" icon="Plus" @click="handleAdd">添加品牌</el-button>
        <el-table style="margin:10px 0px" border :data="tableData">
            <el-table-column prop="id" label="序号" type="index" align="center" width="80px"></el-table-column>
            <el-table-column prop="tmName" label="品牌名称"></el-table-column>
            <el-table-column label="品牌LOGO">
                <template #default="scope">
                    <el-image :src=scope.row.logoUrl alt="" style="width: 100px;height: 100px;"></el-image>
                </template>
            </el-table-column>
            <el-table-column label="品牌操作">
                <template #default="scope">
                    <el-button icon="Edit" @click="handleEdit(scope.$index, scope.row)"></el-button>
                    <el-button icon="Delete" type="danger" @click="handleDelete(scope.$index, scope.row.id)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" @size-change="changeSizePage"
            @current-change="changeCurrentPage" :page-sizes="[5, 7, 9, 15]" background
            layout="prev, pager, next, jumper,->,sizes,total" :total="total" />
    </el-card>
    <!-- v-model来控制对话框是否显示 -->
    <el-dialog v-model="dialogFormVisible" title="添加品牌">

        <el-form :model="ruleForm" label-width="120px" style="width: 90%;" :rules="rules" ref="ruleFormRef">
            <el-form-item label="品牌名称" prop="tmName">
                <el-input placeholder="请输入品牌名称" v-model="ruleForm.tmName" />
            </el-form-item>
            <el-form-item label="品牌LOGO" prop="logoUrl">
                <el-upload class="avatar-uploader" action="api//admin/product/fileUpload" :show-file-list="false"
                    :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">

                    <img v-if="ruleForm.logoUrl" :src="ruleForm.logoUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="submit">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted,nextTick } from 'vue';
import { reqHasTrademark, reqDeleteTrademark, reqAddOrUpdateTrademark } from '@/api/produce/trandmark'
import { Records, TradeMarkResponseData, TradeMark } from '@/api/produce/trandmark/type';
import { ElMessage, type UploadProps, type FormRules, type FormInstance } from 'element-plus'

let pageNo = ref<number>(1)
let limit = ref<number>(5)
let total = ref<number>(0)
let tableData = ref<Records>([])
const dialogFormVisible = ref<boolean>(false)
let ruleForm = reactive<TradeMark>({
    tmName: '',
    logoUrl: ''

})

const ruleFormRef = ref<FormInstance>()

//品牌自定义校验规则方法
const checkTmName = (rule: any, value: any, callBack: any) => {
    //是当表单元素触发blur时候,会触发此方法
    //自定义校验规则
    if (value.trim().length >= 2) {
        callBack();
    } else {
        //校验未通过返回的错误的提示信息
        callBack(new Error('品牌名称位数大于等于两位'))
    }
}
//品牌LOGO图片的自定义校验规则方法
const checkLogoUrl = (rule: any, value: any, callBack: any) => {
    //如果图片上传
    if (value) {
        callBack();
    } else {
        callBack(new Error('LOGO图片务必上传'))
    }
}
const rules = reactive<FormRules<typeof ruleForm>>({
    tmName: [{ required: true, validator: checkTmName, trigger: 'blur' }],
    logoUrl: [{ required: true, validator: checkLogoUrl }],
})




const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
    ruleForm.logoUrl = response.data 
      //图片上传成功,清除掉对应图片校验结果
        ruleFormRef.value.clearValidate('logoUrl');
    
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type == 'image/png' || rawFile.type == 'image/jpeg' || rawFile.type == 'image/gif') {
        if (rawFile.size / 1024 / 1024 < 4) {
            return true;
        } else {
            ElMessage({
                type: 'error',
                message: '上传文件大小小于4M'
            })
            return false;
        }
    } else {
        ElMessage({
            type: 'error',
            message: "上传文件格式务必PNG|JPG|GIF"
        })
        return false;
    }
}

const getHasTrademark = (async (page = 1) => {
    pageNo.value = page
    let res: TradeMarkResponseData = await reqHasTrademark(pageNo.value, limit.value)
    tableData.value = res.data.records
    total.value = res.data.total
})

// 添加品牌点击事件
const handleAdd = async () => {
    dialogFormVisible.value = true
    ruleForm.logoUrl = ''
    ruleForm.tmName = ''
    

}
//  修改品牌点击事件
const handleEdit = (index:number, row:TradeMark) => {
    dialogFormVisible.value = true
    Object.assign(ruleForm, row)
}

const handleDelete = async (index:number, id:number) => {
    let res = await reqDeleteTrademark(id)
    if (res.code == 200) {
        ElMessage({
            type: 'success',
            message: '删除品牌成功'
        });
        await getHasTrademark(tableData.value.length > 1 ? pageNo.value : pageNo.value - 1)
    } else {
        ElMessage({
            type: 'error',
            message: res.data
        });
    }
}
const changeCurrentPage = () => {
    getHasTrademark(pageNo.value)
}
const changeSizePage = () => {
    getHasTrademark()
}

const cancel = () => {
    nextTick(()=>{
        ruleFormRef.value.clearValidate('logoUrl');
        ruleFormRef.value.clearValidate('tmName');
      })
    dialogFormVisible.value = false
 
}

const submit = async () => {
    await ruleFormRef.value?.validate()
    let res = await reqAddOrUpdateTrademark(ruleForm)
    if (res.code === 200) {
        dialogFormVisible.value = false
        await getHasTrademark(ruleForm.id ? pageNo.value : 1)
        ElMessage({
            type: 'success',
            message: ruleForm.id ? '修改品牌成功' : '添加品牌成功'
        });
    } else {
        ElMessage({
            type: 'error',
            message: ruleForm.id ? '修改品牌失败' : '添加品牌失败'
        });
    }
}

onMounted(() => {
    getHasTrademark()

})

</script>
<style scoped>
.dialog-footer button {
    margin-right: 10px;
}

.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style >
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>
