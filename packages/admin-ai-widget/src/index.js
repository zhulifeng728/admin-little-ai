import { marked } from 'marked'
import './style.css'

class AdminAIWidget {
  constructor(options = {}) {
    this.options = {
      apiUrl: options.apiUrl || 'http://localhost:3000/api',
      position: options.position || 'bottom-right',
      ...options
    }

    this.isOpen = false
    this.history = []

    this.init()
  }

  init() {
    this.createWidget()
    this.bindEvents()
  }

  createWidget() {
    // 创建容器
    const container = document.createElement('div')
    container.className = `ai-widget-container ${this.options.position}`
    container.innerHTML = `
      <div class="ai-widget-button" id="ai-widget-button">
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
      </div>

      <div class="ai-widget-panel" id="ai-widget-panel" style="display: none;">
        <div class="ai-widget-header">
          <span>AI助手</span>
          <button class="ai-widget-close" id="ai-widget-close">×</button>
        </div>
        <div class="ai-widget-messages" id="ai-widget-messages">
          <div class="ai-message">
            <div class="message-content">
              您好！我是AI助手，有什么可以帮您的吗？
            </div>
          </div>
        </div>
        <div class="ai-widget-input">
          <input type="text" id="ai-widget-input" placeholder="输入您的问题..." />
          <button id="ai-widget-send">发送</button>
        </div>
      </div>
    `

    document.body.appendChild(container)
    this.container = container
    this.button = container.querySelector('#ai-widget-button')
    this.panel = container.querySelector('#ai-widget-panel')
    this.messages = container.querySelector('#ai-widget-messages')
    this.input = container.querySelector('#ai-widget-input')
  }

  bindEvents() {
    // 打开/关闭面板
    this.button.addEventListener('click', () => this.togglePanel())
    this.container.querySelector('#ai-widget-close').addEventListener('click', () => this.togglePanel())

    // 发送消息
    this.container.querySelector('#ai-widget-send').addEventListener('click', () => this.sendMessage())
    this.input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.sendMessage()
      }
    })

    // 监听消息中的链接点击
    this.messages.addEventListener('click', (e) => {
      if (e.target.tagName === 'A' && e.target.hash) {
        e.preventDefault()
        const path = e.target.hash.substring(1) // 移除 #
        this.handleNavigation(path)
      }
    })
  }

  togglePanel() {
    this.isOpen = !this.isOpen
    this.panel.style.display = this.isOpen ? 'flex' : 'none'
    if (this.isOpen) {
      this.input.focus()
    }
  }

  async sendMessage() {
    const message = this.input.value.trim()
    if (!message) return

    // 显示用户消息
    this.addMessage(message, 'user')
    this.input.value = ''

    // 显示加载状态
    const loadingId = this.addMessage('正在思考...', 'ai', true)

    try {
      // 调用API
      const response = await fetch(`${this.options.apiUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message,
          history: this.history
        })
      })

      if (!response.ok) {
        throw new Error('请求失败')
      }

      const data = await response.json()

      // 移除加载消息
      this.removeMessage(loadingId)

      // 显示AI回复
      this.addMessage(data.content, 'ai')

      // 更新历史
      this.history.push(
        { role: 'user', content: message },
        { role: 'assistant', content: data.content }
      )

      // 限制历史长度
      if (this.history.length > 10) {
        this.history = this.history.slice(-10)
      }

    } catch (error) {
      console.error('发送消息失败:', error)
      this.removeMessage(loadingId)
      this.addMessage('抱歉，发生了错误，请稍后重试。', 'ai')
    }
  }

  addMessage(content, type, isLoading = false) {
    const messageId = `msg-${Date.now()}`
    const messageDiv = document.createElement('div')
    messageDiv.className = `${type}-message`
    messageDiv.id = messageId

    const contentDiv = document.createElement('div')
    contentDiv.className = 'message-content'

    if (type === 'ai' && !isLoading) {
      // 渲染Markdown
      contentDiv.innerHTML = marked.parse(content)
    } else {
      contentDiv.textContent = content
    }

    messageDiv.appendChild(contentDiv)
    this.messages.appendChild(messageDiv)

    // 滚动到底部
    this.messages.scrollTop = this.messages.scrollHeight

    return messageId
  }

  removeMessage(messageId) {
    const message = document.getElementById(messageId)
    if (message) {
      message.remove()
    }
  }

  handleNavigation(path) {
    // 触发自定义事件，让宿主系统处理导航
    window.dispatchEvent(new CustomEvent('ai-assistant-navigate', {
      detail: { path }
    }))
  }
}

// 导出
export default AdminAIWidget

// 如果是UMD格式，挂载到window
if (typeof window !== 'undefined') {
  window.AdminAIWidget = AdminAIWidget
}
