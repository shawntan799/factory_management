Page({
  data: {
    supplierInfo: {
      name: '',
      contactPerson: '',
      phone: '',
      email: '',
      address: '',
      businessLicense: '',
      taxNumber: ''
    },
    isScanning: false
  },

  // 扫码录入供应商信息
  scanSupplierInfo() {
    this.setData({
      isScanning: true
    })

    wx.scanCode({
      success: (res) => {
        console.log('扫码结果:', res)
        try {
          // 解析二维码内容，假设二维码包含JSON格式的供应商信息
          const supplierData = JSON.parse(res.result)
          this.setData({
            supplierInfo: {
              ...this.data.supplierInfo,
              ...supplierData
            },
            isScanning: false
          })
          wx.showToast({
            title: '扫码成功',
            icon: 'success'
          })
        } catch (error) {
          console.error('解析二维码失败:', error)
          wx.showToast({
            title: '二维码格式错误',
            icon: 'error'
          })
          this.setData({
            isScanning: false
          })
        }
      },
      fail: (error) => {
        console.error('扫码失败:', error)
        wx.showToast({
          title: '扫码失败',
          icon: 'error'
        })
        this.setData({
          isScanning: false
        })
      }
    })
  },

  // 手动输入供应商信息
  inputSupplierInfo(e) {
    const { field } = e.currentTarget.dataset
    const { value } = e.detail
    this.setData({
      [`supplierInfo.${field}`]: value
    })
  },

  // 保存供应商信息
  saveSupplierInfo() {
    const { supplierInfo } = this.data
    
    // 验证必填字段
    if (!supplierInfo.name || !supplierInfo.contactPerson || !supplierInfo.phone) {
      wx.showToast({
        title: '请填写必填信息',
        icon: 'error'
      })
      return
    }

    // 这里可以调用API保存到后端
    console.log('保存供应商信息:', supplierInfo)
    
    wx.showLoading({
      title: '保存中...'
    })

    // 模拟API调用
    setTimeout(() => {
      wx.hideLoading()
      wx.showToast({
        title: '保存成功',
        icon: 'success'
      })
      
      // 清空表单
      this.setData({
        supplierInfo: {
          name: '',
          contactPerson: '',
          phone: '',
          email: '',
          address: '',
          businessLicense: '',
          taxNumber: ''
        }
      })
    }, 1000)
  },

  // 生成供应商二维码
  generateQRCode() {
    const { supplierInfo } = this.data
    const qrData = JSON.stringify(supplierInfo)
    
    // 这里可以调用API生成二维码
    console.log('生成二维码数据:', qrData)
    
    wx.showToast({
      title: '二维码生成成功',
      icon: 'success'
    })
  }
}) 