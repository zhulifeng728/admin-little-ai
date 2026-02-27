<template>
  <div class="routes-page">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>路由配置列表</span>
          <div>
            <el-upload
              :show-file-list="false"
              :before-upload="handleImport"
              accept=".json"
              style="display: inline-block; margin-right: 10px;"
            >
              <el-button type="success">
                <el-icon><Upload /></el-icon>
                导入JSON
              </el-button>
            </el-upload>
            <el-button type="primary" @click="handleAdd">
              <el-icon><Plus /></el-icon>
              添加路由
            </el-button>
          </div>
        </div>
      </template>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="path" label="路由路径" width="200" />
        <el-table-column prop="name" label="页面名称" width="150" />
        <el-table-column prop="description" label="页面描述" />
        <el-table-column label="操作" width="180">
          <template #default="{ row }">
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
        <el-form-item label="路由路径">
          <el-input v-model="form.path" placeholder="如：/user/list" />
        </el-form-item>
        <el-form-item label="页面名称">
          <el-input v-model="form.name" placeholder="如：用户列表" />
        </el-form-item>
        <el-form-item label="页面描述">
          <el-input
            v-model="form.description"
            type="textarea"
            :rows="3"
            placeholder="请输入页面功能描述"
          />
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
import { Plus, Upload } from '@element-plus/icons-vue'
import { routeAPI } from '../api'

const tableData = ref([])
const dialogVisible = ref(false)
const dialogTitle = ref('')
const form = ref({
  id: null,
  path: '',
  name: '',
  description: ''
})

const loadData = async () => {
  try {
    tableData.value = await routeAPI.getList()
  } catch (error) {
    console.error('加载失败:', error)
  }
}

const handleAdd = () => {
  dialogTitle.value = '添加路由'
  form.value = {
    id: null,
    path: '',
    name: '',
    description: ''
  }
  dialogVisible.value = true
}

const handleEdit = (row) => {
  dialogTitle.value = '编辑路由'
  form.value = { ...row }
  dialogVisible.value = true
}

const handleSubmit = async () => {
  try {
    if (form.value.id) {
      await routeAPI.update(form.value.id, form.value)
      ElMessage.success('更新成功')
    } else {
      await routeAPI.create(form.value)
      ElMessage.success('创建成功')
    }
    dialogVisible.value = false
    loadData()
  } catch (error) {
    console.error('提交失败:', error)
  }
}

const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm('确定要删除这条记录吗？', '提示', {
      type: 'warning'
    })
    await routeAPI.delete(row.id)
    ElMessage.success('删除成功')
    loadData()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除失败:', error)
    }
  }
}

const handleImport = async (file) => {
  try {
    const reader = new FileReader()
    reader.onload = async (e) => {
      try {
        const data = JSON.parse(e.target.result)
        const items = Array.isArray(data) ? data : [data]

        const result = await routeAPI.import(items)

        ElMessage.success(`导入完成！成功：${result.success}，失败：${result.failed}`)
        loadData()
      } catch (error) {
        ElMessage.error('JSON格式错误或导入失败')
        console.error('导入失败:', error)
      }
    }
    reader.readAsText(file)
  } catch (error) {
    ElMessage.error('文件读取失败')
  }
  return false // 阻止自动上传
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.routes-page {
  height: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
