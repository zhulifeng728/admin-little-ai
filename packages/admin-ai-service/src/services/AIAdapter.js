import axios from 'axios';

class AIAdapter {
  constructor(config) {
    this.provider = config.provider;
    this.apiKey = config.api_key;
    this.baseUrl = config.base_url;
    this.model = config.model;
  }

  async chat(messages) {
    // 对于OpenAI兼容的API（包括NVIDIA、自定义等），统一使用OpenAI格式
    switch (this.provider) {
      case 'openai':
      case 'nvidia':
      case 'custom':
        return await this.chatOpenAI(messages);
      case 'qwen':
        return await this.chatQwen(messages);
      default:
        // 默认尝试使用OpenAI兼容格式
        return await this.chatOpenAI(messages);
    }
  }

  async chatOpenAI(messages) {
    // 支持OpenAI及其兼容API（NVIDIA、自定义等）
    try {
      const response = await axios.post(
        `${this.baseUrl}/chat/completions`,
        {
          model: this.model,
          messages: messages,
          temperature: 0.7,
          max_tokens: 1024
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error(`${this.provider} API调用失败:`, error.response?.data || error.message);
      throw new Error('AI服务调用失败');
    }
  }

  async chatQwen(messages) {
    // 通义千问API实现
    try {
      const response = await axios.post(
        `${this.baseUrl}/chat/completions`,
        {
          model: this.model,
          messages: messages,
          temperature: 0.7
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('通义千问API调用失败:', error.response?.data || error.message);
      throw new Error('AI服务调用失败');
    }
  }
}

export default AIAdapter;
