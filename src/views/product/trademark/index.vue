<template>
    <el-card style="margin:10px 0px">
        <el-button type="primary" size="default" icon="Plus">添加属性</el-button>
        <el-table style="margin:10px 0px" border>
            <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
            <el-table-column label="属性名称" width="120px" prop="attrName"></el-table-column>
            <el-table-column label="属性值名称">
            </el-table-column>
            <el-table-column label="操作" width="120px">
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]" background
        layout="prev, pager, next, jumper,->,sizes,total" :total="1000"/>
    </el-card>
</template>

<script setup lang="ts">
import { ref,onMounted } from 'vue';
import {reqHasTrademark} from '@/api/produce/trandmark'
let pageNo=ref<number>(1)
let limit =ref<number>(3)
const getHasTrademark=(async()=>{
    let res =await reqHasTrademark(pageNo.value,limit.value)
    console.log(res)
})

onMounted( ()=>{
    getHasTrademark()
    
})
</script>

<style scoped></style>