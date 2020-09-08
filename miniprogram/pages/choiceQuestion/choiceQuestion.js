// miniprogram/pages/choiceQuestion/choiceQuestion.js
Page({
 
  /**
   * 页面的初始数据
   */
  data: {

    animationData: {}, //内容动画
    animationMask: {}, //蒙板动画

    title:'',
    type:0,
    typeStr:'',
    options:[],
    answer:'Z',
    difficulty:0,
    difficultyStr:'',
    analysis:'',

    singleItems: [],
    mutliItems:[],
    focus: false,
    line:'0em',
    datiTitle:'',
    datiBackGroundColor:'#ff0000'
  },

  getDataFromApi: function() {
    var app = getApp();
    var currentIndex = app.globalData.currentIndex;
    console.log(currentIndex);
    wx.cloud.callFunction({
      name: 'get_ques_info',
      data: {
        question_id:currentIndex
      },
      success: res => {
        console.log(res)

        this.setData({
          type:res.result.type,
          title:res.result.title,
          options:res.result.options, 
        })

        var optionA = {};
        optionA.name='A';
        var titleA = this.data.options[0];
        optionA.value= titleA;

        var optionB = {};
        optionB.name='B';
        optionB.value=this.data.options[1];

        var optionC = {};
        optionC.name='C';
        optionC.value=this.data.options[2];

        var optionD = {};
        optionD.name='D';
        optionD.value=this.data.options[3];

        let itemss=[];
        itemss.push(optionA);
        itemss.push(optionB);
        itemss.push(optionC);
        itemss.push(optionD);
        console.log(itemss);

        var type = res.result.type;
        if (type == 1) {
          this.setData({
            singleItems:itemss,
            mutliItems:[],
            line:'0em',
            datiTitle:'',
            datiBackGroundColor:'#FFFFFF'
          })
        } else if (type == 2 || type == 3) {
          this.setData({
            mutliItems:itemss,
            singleItems:[],
            line:'0em',
            datiTitle:'',
            datiBackGroundColor:'#FFFFFF'
          })
        } else {
          this.setData({
            mutliItems:[],
            singleItems:[],
            line:'10em',
            datiTitle:'请在输入框内输入你的答案',
            datiBackGroundColor:'#FF0000'
          })
        }
        var typeStr1 = '';
        if (type == 1) {
          typeStr1 = '单选题';
          //进行UI布局的改变
        } else if (type == 2 || type == 3) {
          typeStr1 = '多选题';
        } else if (type == 3) {
          typeStr1 = '不定向';
        } else if (type == 4) {
          typeStr1 = '主观题';
        }
        this.setData({
          typeStr:typeStr1
        })
        var diff = res.result.difficulty;
        var diffStr1 = '';
        if (diff == 1) {
          diffStr1 = '入门';
        } else if (diff == 2) {
          diffStr1 = '简单';
        } else if (diff == 3) {
          diffStr1 = '普通';
        } else if (diff == 4) {
          diffStr1 = '较难';
        } else {
          diffStr1 = '困难';
        }
        this.setData({
          difficultyStr:diffStr1
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
        console.error('[云函数] [sum] 调用失败：', err)
      }
    })
  },

  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },

  checkboxChange: function(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },

  onLoad: function() {  //弹窗动画
    this.animateTrans = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease',
    })
 
    this.animateFade = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease',
    })

    this.getDataFromApi();//得到数据
  },

  // 隐藏弹窗
  hideModal: function() {
    this.animateTrans.translateY(300).step()
    this.animateFade.opacity(0).step()
    this.setData({
      animationData: this.animateTrans.export(),
      animationMask: this.animateFade.export()
    })
  },

  submitAnswer: function() {//提交答案，展示弹窗
    var app = getApp();
    var currentIndex = app.globalData.currentIndex;
    console.log(currentIndex);
    wx.cloud.callFunction({
      name: 'update_user_result',
      data: {
        union_id:'123',
        question_id:currentIndex,
        result:true,
      },
      success: res => {
        wx.showToast({
          title: '提交成功',
        })
      },
      fail: err => {
        wx.showToast({
          title: '提交失败',
        })
      }
    })
  },

  nextProject: function() {
    var app = getApp();
    app.globalData.currentIndex++;
    console.log(app.globalData.currentIndex++);
    this.getDataFromApi();
  },

  textareaInput2: function (e) {
    console.log(e.detail.value)
  }

})