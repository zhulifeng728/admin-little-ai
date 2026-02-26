<template>
  <div class="models-page">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>AI模型配置列表</span>
          <el-button type="primary" @click="handleAdd">
            <el-icon><Plus /></el-icon>
            添加模型
          </el-button>
        </div>
      </template>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="模型名称" width="200" />
        <el-table-column prop="provider" label="服务商" width="120">
          <template #default="{ row }">
            <el-tag v-if="row.provider === 'openai'">OpenAI</el-tag>
            <el-tag v-else-if="row.provider === 'qwen'" type="success">通义千问</el-tag>
            <el-tag v-else-if="row.provider === 'wenxin'" type="warning">文心一言</el-tag>
            <el-tag v-else-if="row.provider === 'zhipu'" type="info">智谱AI</el-tag>
            <el-tag v-else>{{ row.provider }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="model" label="模型" width="150" />
        <el-table-column prop="is_active" label="状态" width="100">
          <template #default="{ row }">
            <el-tag v-if="row.is_active" type="success">已启用</el-tag>
            <el-tag v-else type="info">未启用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250">
          <template #default="{ row }">
            <el-button v-if="!row.is_active" size="small" type="success" @click="handleActivate(row)">
              启用
            </el-button>
            <el-button size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 编辑对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="600px"
    >
      <el-form :model="form" label-width="100px">
        <el-form-item label="模型名称">
          <el-input v-model="form.name" placeholder="如：OpenAI GPT-3.5" />
        </el-form-item>
        <el-form-item label="服务商">
          <el-select v-model="form.provider" placeholder="请选择服务商">
            <el-option label="OpenAI" value="openai" />
            <el-option label="通义千问" value="qwen" />
            <el-option label="文心一言" value="wenxin" />
            <el-option label="智谱AI" value="zhipu" />
          </el-select>
        </el-form-item>
        <el-form-item label="API密钥">
          <el-input v-model="form.api_key" type="password" placeholder="请输入API密钥" show-password />
        </el-form-item>
        <el-form-item label="API地址">
          <el-input v-model="form.base_url" placeholder="如：https://api.openai.com/v1" />
        </el-form-item>
        <el-form-item label="模型名称">
          <el-input v-model="form.model" placeholder="如：gpt-3.5-turbo" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { modelAPI } from '../api'

const tableData = ref([])
const dialogVisible = ref(false)
const dialogTitle = ref('')
const form = ref({
  id: null,
  name: '',
  provider: 'openai',
  api_key: '',
  base_url: '',
  model: ''
})

const loadData = async () => {
  try {
    tableData.value = await modelAPI.getList()
  } catch (error) {
    console.error('加载失败:', error)
  }
}

const handleAdd = () => {
  dialogTitle.value = '添加模型'
  form.value = {
    id: null,
    name: '',
    provider: 'openai',
    api_key: '',
    base_url: 'https://api.openai.com/v1',
    model: 'gpt-3.5-turbo'
  }
  dialogVisible.value = true
}

const handleEdit = (row) => {
  dialogTitle.value = '编辑模型'
  form.value = { ...row }
  dialogVisible.value = true
}

const handleSubmit = async () => {
  try {
    if (form.value.id) {
      await modelAPI.update(form.value.id, form.value)
      ElMessage.success('更新成功')
    } else {
      await modelAPI.create(form.value)
      ElMessage.success('创建成功')
    }
    dialogVisible.value = false
    loadData()
  } catch (error) {
    console.error('提交失败:', error)
  }
}

const handleActivate = async (row) => {
  try {
    await modelAPI.activate(row.id)
    ElMessage.success('启用成功')
    loadData()
  } catch (error) {
    console.error('启用失败:', error)
  }
}

const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm('确定要删除这条记录吗？', '提示', {
      type: 'warning'
    })
    await modelAPI.delete(row.id)
    ElMessage.success('删除成功')
    loadData()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除失败:', error)
    }
  }
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.models-page {
  height: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
