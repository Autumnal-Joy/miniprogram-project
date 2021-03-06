Component({
  behaviors: [],

  properties: {
    // myProperty: {
    //   type: String,
    //   value: "",
    // },
    // myProperty2: String,
  },

  data: {}, // 私有数据，可用于模板渲染

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名

  // 此处attached的声明会被lifetimes字段中的声明覆盖
  attached: function () {},
  ready: function () {},

  lifetimes: {
    attached: function () {},
    moved: function () {},
    detached: function () {},
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {},
    hide: function () {},
    resize: function () {},
  },

  methods: {
    hidePopup() {
      this.triggerEvent("hide");
    },
    // 内部方法建议以下划线开头
    _myPrivateMethod: function () {},

    _propertyChange: function (newVal, oldVal) {},
  },
});
