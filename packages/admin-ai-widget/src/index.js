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

    // 拖拽相关状态
    this.isDragging = false
    this.dragStartX = 0
    this.dragStartY = 0
    this.buttonStartX = 0
    this.buttonStartY = 0

    this.init()
  }

  init() {
    this.createWidget()
    this.setInitialPosition()
    this.bindEvents()
    this.loadSuggestedQuestions()
    this.watchRouteChanges()
  }

  setInitialPosition() {
    // 设置按钮初始位置：右侧垂直居中
    const buttonHeight = 56
    const rightMargin = 20
    const top = (window.innerHeight - buttonHeight) / 2

    this.button.style.position = 'fixed'
    this.button.style.right = rightMargin + 'px'
    this.button.style.top = top + 'px'
  }

  createWidget() {
    // 创建容器
    const container = document.createElement('div')
    container.className = `ai-widget-container ${this.options.position}`
    container.innerHTML = `
      <div class="ai-widget-button" id="ai-widget-button">
        <svg viewBox="0 0 1024 1024" width="28" height="28">
          <path d="M755.0840951 785.34757683H264.03469814c-121.54204755 0-220.63054415-99.08849661-220.63054413-220.63054418v-198.17699316c0-121.54204755 99.08849661-220.63054415 220.63054413-220.63054419h491.04939696c121.54204755 0 220.63054415 99.08849661 220.63054416 220.63054419v198.17699316c0 121.54204755-99.08849661 220.63054415-220.63054416 220.63054418zM264.03469814 194.72156261c-94.69541053 0-171.81847687 77.12306631-171.81847683 171.81847688v198.17699316c0 94.69541053 77.12306631 171.81847687 171.81847683 171.81847689h491.04939696c94.69541053 0 171.81847687-77.12306631 171.81847688-171.81847689v-198.17699316c0-94.69541053-77.12306631-171.81847687-171.81847688-171.81847688H264.03469814z" fill="currentColor"></path>
          <path d="M282.58328374 599.86172112c-13.66737884 0-24.40603363-11.22677545-24.40603366-24.40603362v-219.65430281c0-13.66737884 11.22677545-24.40603363 24.40603366-24.40603367 13.66737884 0 24.40603363 11.22677545 24.40603363 24.40603367v219.65430281c0 13.66737884-10.73865482 24.40603363-24.40603363 24.40603362zM717.01068263 599.86172112c-13.66737884 0-24.40603363-11.22677545-24.40603365-24.40603362v-219.65430281c0-13.66737884 11.22677545-24.40603363 24.40603365-24.40603367 13.66737884 0 24.40603363 11.22677545 24.40603363 24.40603367v219.65430281c0 13.66737884-10.73865482 24.40603363-24.40603363 24.40603362zM375.32621158 858.56567777c0-13.66737884 11.22677545-24.40603363 24.40603365-24.40603365h219.65430283c13.66737884 0 24.40603363 11.22677545 24.40603361 24.40603365 0 13.66737884-11.22677545 24.40603363-24.40603361 24.40603366h-219.65430283c-13.17925817 0-24.40603363-10.73865482-24.40603365-24.40603366z" fill="currentColor"></path>
        </svg>
      </div>

      <div class="ai-widget-panel" id="ai-widget-panel" style="display: none;">
        <div class="ai-widget-header">
          <span>AI助手</span>
          <div class="header-actions">
            <button class="ai-widget-clear" id="ai-widget-clear" title="清空对话">
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path fill="currentColor" d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
              </svg>
            </button>
            <button class="ai-widget-close" id="ai-widget-close">×</button>
          </div>
        </div>
        <div class="ai-widget-messages" id="ai-widget-messages">
          <div class="welcome-section">
            <div class="welcome-badge">
              <svg viewBox="0 0 1024 1024" width="18" height="18">
                <path d="M755.0840951 785.34757683H264.03469814c-121.54204755 0-220.63054415-99.08849661-220.63054413-220.63054418v-198.17699316c0-121.54204755 99.08849661-220.63054415 220.63054413-220.63054419h491.04939696c121.54204755 0 220.63054415 99.08849661 220.63054416 220.63054419v198.17699316c0 121.54204755-99.08849661 220.63054415-220.63054416 220.63054418zM264.03469814 194.72156261c-94.69541053 0-171.81847687 77.12306631-171.81847683 171.81847688v198.17699316c0 94.69541053 77.12306631 171.81847687 171.81847683 171.81847689h491.04939696c94.69541053 0 171.81847687-77.12306631 171.81847688-171.81847689v-198.17699316c0-94.69541053-77.12306631-171.81847687-171.81847688-171.81847688H264.03469814z" fill="currentColor"></path>
                <path d="M282.58328374 599.86172112c-13.66737884 0-24.40603363-11.22677545-24.40603366-24.40603362v-219.65430281c0-13.66737884 11.22677545-24.40603363 24.40603366-24.40603367 13.66737884 0 24.40603363 11.22677545 24.40603363 24.40603367v219.65430281c0 13.66737884-10.73865482 24.40603363-24.40603363 24.40603362zM717.01068263 599.86172112c-13.66737884 0-24.40603363-11.22677545-24.40603365-24.40603362v-219.65430281c0-13.66737884 11.22677545-24.40603363 24.40603365-24.40603367 13.66737884 0 24.40603363 11.22677545 24.40603363 24.40603367v219.65430281c0 13.66737884-10.73865482 24.40603363-24.40603363 24.40603362zM375.32621158 858.56567777c0-13.66737884 11.22677545-24.40603363 24.40603365-24.40603365h219.65430283c13.66737884 0 24.40603363 11.22677545 24.40603361 24.40603365 0 13.66737884-11.22677545 24.40603363-24.40603361 24.40603366h-219.65430283c-13.17925817 0-24.40603363-10.73865482-24.40603365-24.40603366z" fill="currentColor"></path>
              </svg>
              <span>AI助手</span>
            </div>
            <h2 class="welcome-title">有什么可以帮助你的吗？</h2>
          </div>
          <div class="suggested-questions" id="suggested-questions">
            <div class="suggested-questions-desc">这些事项可能需要关注，我可以帮你处理</div>
            <div class="suggested-questions-list" id="suggested-questions-list"></div>
          </div>
        </div>
        <div class="ai-widget-input">
          <input type="text" id="ai-widget-input" placeholder="请输入内容" />
          <button id="ai-widget-send">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>
        <div class="ai-widget-footer">
          <span>内容由 AI 生成，仅供参考</span>
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
    // 拖拽功能
    this.button.addEventListener('mousedown', (e) => this.handleDragStart(e))
    document.addEventListener('mousemove', (e) => this.handleDragMove(e))
    document.addEventListener('mouseup', (e) => this.handleDragEnd(e))

    // 关闭面板
    this.container.querySelector('#ai-widget-close').addEventListener('click', () => this.togglePanel())

    // 清空对话
    this.container.querySelector('#ai-widget-clear').addEventListener('click', () => this.clearConversation())

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
        const path = decodeURIComponent(e.target.hash.substring(1)) // 移除 # 并解码
        this.handleNavigation(path)
      }
    })
  }

  togglePanel() {
    this.isOpen = !this.isOpen

    if (this.isOpen) {
      // 获取按钮位置
      const buttonRect = this.button.getBoundingClientRect()
      const panelWidth = 400
      const panelHeight = 600
      const gap = 16 // 面板与按钮的间距

      // 计算面板位置
      let left, top

      // 判断按钮在屏幕的左侧还是右侧
      const isLeft = buttonRect.left < window.innerWidth / 2

      if (isLeft) {
        // 按钮在左侧，面板显示在右侧
        left = buttonRect.right + gap
      } else {
        // 按钮在右侧，面板显示在左侧
        left = buttonRect.left - panelWidth - gap
      }

      // 垂直居中对齐按钮
      top = buttonRect.top + (buttonRect.height / 2) - (panelHeight / 2)

      // 确保面板不超出屏幕
      left = Math.max(gap, Math.min(left, window.innerWidth - panelWidth - gap))
      top = Math.max(gap, Math.min(top, window.innerHeight - panelHeight - gap))

      this.panel.style.left = left + 'px'
      this.panel.style.top = top + 'px'
      this.panel.style.display = 'flex'

      this.input.focus()
    } else {
      this.panel.style.display = 'none'
    }
  }

  handleDragStart(e) {
    this.isDragging = false
    this.dragStartX = e.clientX
    this.dragStartY = e.clientY

    // 获取按钮当前位置
    const rect = this.button.getBoundingClientRect()
    this.buttonStartX = rect.left
    this.buttonStartY = rect.top

    // 如果按钮还没有设置为fixed定位，则设置
    if (this.button.style.position !== 'fixed') {
      this.button.style.position = 'fixed'
      this.button.style.left = rect.left + 'px'
      this.button.style.top = rect.top + 'px'
    }

    this.button.classList.add('dragging')
    e.preventDefault()
  }

  handleDragMove(e) {
    if (this.dragStartX === 0 && this.dragStartY === 0) return

    const deltaX = e.clientX - this.dragStartX
    const deltaY = e.clientY - this.dragStartY

    // 如果移动距离超过5px，认为是拖拽
    if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
      this.isDragging = true

      // 使用transform来移动，性能更好
      this.button.style.transform = `translate(${deltaX}px, ${deltaY}px)`
    }
  }

  handleDragEnd(e) {
    if (this.dragStartX === 0 && this.dragStartY === 0) return

    this.button.classList.remove('dragging')

    // 如果发生了拖拽，将transform转换为实际位置
    if (this.isDragging) {
      const deltaX = e.clientX - this.dragStartX
      const deltaY = e.clientY - this.dragStartY

      let newX = this.buttonStartX + deltaX
      let newY = this.buttonStartY + deltaY

      // 限制在窗口范围内
      const maxX = window.innerWidth - this.button.offsetWidth
      const maxY = window.innerHeight - this.button.offsetHeight

      newX = Math.max(0, Math.min(newX, maxX))
      newY = Math.max(0, Math.min(newY, maxY))

      // 清除transform，设置实际位置
      this.button.style.transform = ''
      this.button.style.left = newX + 'px'
      this.button.style.top = newY + 'px'
    } else {
      // 如果没有拖拽，则是点击事件
      this.togglePanel()
    }

    // 重置拖拽状态
    this.dragStartX = 0
    this.dragStartY = 0
    this.isDragging = false
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

      // 显示AI回复（使用打字机效果）
      await this.addMessageWithTypewriter(data.content, 'ai')

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

  async addMessageWithTypewriter(content, type) {
    const messageId = `msg-${Date.now()}`
    const messageDiv = document.createElement('div')
    messageDiv.className = `${type}-message`
    messageDiv.id = messageId

    const contentDiv = document.createElement('div')
    contentDiv.className = 'message-content'

    messageDiv.appendChild(contentDiv)
    this.messages.appendChild(messageDiv)

    // 先渲染完整的Markdown以获取HTML结构
    const fullHtml = marked.parse(content)

    // 创建临时元素来解析HTML
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = fullHtml

    // 逐字符显示
    await this.typewriterEffect(contentDiv, tempDiv.textContent)

    // 最后替换为完整的Markdown渲染结果
    contentDiv.innerHTML = fullHtml

    return messageId
  }

  async typewriterEffect(element, text, speed = 30) {
    element.textContent = ''
    for (let i = 0; i < text.length; i++) {
      element.textContent += text[i]
      // 滚动到底部
      this.messages.scrollTop = this.messages.scrollHeight
      await new Promise(resolve => setTimeout(resolve, speed))
    }
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

  clearConversation() {
    // 清空对话历史
    this.history = []

    // 清空消息区域并重新创建欢迎内容
    this.messages.innerHTML = `
      <div class="welcome-section">
        <div class="welcome-badge">
          <svg viewBox="0 0 1024 1024" width="18" height="18">
            <path d="M755.0840951 785.34757683H264.03469814c-121.54204755 0-220.63054415-99.08849661-220.63054413-220.63054418v-198.17699316c0-121.54204755 99.08849661-220.63054415 220.63054413-220.63054419h491.04939696c121.54204755 0 220.63054415 99.08849661 220.63054416 220.63054419v198.17699316c0 121.54204755-99.08849661 220.63054415-220.63054416 220.63054418zM264.03469814 194.72156261c-94.69541053 0-171.81847687 77.12306631-171.81847683 171.81847688v198.17699316c0 94.69541053 77.12306631 171.81847687 171.81847683 171.81847689h491.04939696c94.69541053 0 171.81847687-77.12306631 171.81847688-171.81847689v-198.17699316c0-94.69541053-77.12306631-171.81847687-171.81847688-171.81847688H264.03469814z" fill="currentColor"></path>
            <path d="M282.58328374 599.86172112c-13.66737884 0-24.40603363-11.22677545-24.40603366-24.40603362v-219.65430281c0-13.66737884 11.22677545-24.40603363 24.40603366-24.40603367 13.66737884 0 24.40603363 11.22677545 24.40603363 24.40603367v219.65430281c0 13.66737884-10.73865482 24.40603363-24.40603363 24.40603362zM717.01068263 599.86172112c-13.66737884 0-24.40603363-11.22677545-24.40603365-24.40603362v-219.65430281c0-13.66737884 11.22677545-24.40603363 24.40603365-24.40603367 13.66737884 0 24.40603363 11.22677545 24.40603363 24.40603367v219.65430281c0 13.66737884-10.73865482 24.40603363-24.40603363 24.40603362zM375.32621158 858.56567777c0-13.66737884 11.22677545-24.40603363 24.40603365-24.40603365h219.65430283c13.66737884 0 24.40603363 11.22677545 24.40603361 24.40603365 0 13.66737884-11.22677545 24.40603363-24.40603361 24.40603366h-219.65430283c-13.17925817 0-24.40603363-10.73865482-24.40603365-24.40603366z" fill="currentColor"></path>
          </svg>
          <span>AI助手</span>
        </div>
        <h2 class="welcome-title">有什么可以帮助你的吗？</h2>
      </div>
      <div class="suggested-questions" id="suggested-questions">
        <div class="suggested-questions-desc">这些事项可能需要关注，我可以帮你处理</div>
        <div class="suggested-questions-list" id="suggested-questions-list"></div>
      </div>
    `

    // 重新加载推荐问题
    this.loadSuggestedQuestions()
  }

  watchRouteChanges() {
    // 监听路由变化
    window.addEventListener('hashchange', () => {
      this.loadSuggestedQuestions()
    })
  }

  getCurrentRoute() {
    // 从URL hash中获取当前路由
    const hash = window.location.hash
    if (hash && hash.length > 1) {
      return decodeURIComponent(hash.substring(1))
    }
    return ''
  }

  async loadSuggestedQuestions() {
    try {
      const currentRoute = this.getCurrentRoute()
      const url = currentRoute
        ? `${this.options.apiUrl}/knowledge/suggested?route=${encodeURIComponent(currentRoute)}`
        : `${this.options.apiUrl}/knowledge/suggested`

      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        this.renderSuggestedQuestions(data.questions || [])
      } else {
        // 如果API不存在，使用默认问题
        this.renderSuggestedQuestions(this.getDefaultQuestions())
      }
    } catch (error) {
      // 使用默认问题
      this.renderSuggestedQuestions(this.getDefaultQuestions())
    }
  }

  getDefaultQuestions() {
    return [
      '如何进行文档分类分级？',
      '什么是核心文档保护？',
      '如何查看文档的家族树？',
      '全周期风险监控包括哪些内容？',
      '如何进行员工泄密分析？'
    ]
  }

  renderSuggestedQuestions(questions) {
    const listContainer = document.getElementById('suggested-questions-list')
    if (!listContainer) return

    listContainer.innerHTML = ''
    questions.forEach(question => {
      const button = document.createElement('button')
      button.className = 'suggested-question-btn'
      button.innerHTML = `
        <span class="question-prefix">#</span>
        <span class="question-text">${question}</span>
        <svg class="question-arrow" viewBox="0 0 24 24" width="16" height="16">
          <path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
        </svg>
      `
      button.addEventListener('click', () => {
        this.input.value = question
        this.sendMessage()
        // 发送后隐藏推荐问题
        const suggestedContainer = document.getElementById('suggested-questions')
        if (suggestedContainer) {
          suggestedContainer.style.display = 'none'
        }
      })
      listContainer.appendChild(button)
    })
  }
}

// 导出
export default AdminAIWidget

// 如果是UMD格式，挂载到window
if (typeof window !== 'undefined') {
  window.AdminAIWidget = AdminAIWidget
}
