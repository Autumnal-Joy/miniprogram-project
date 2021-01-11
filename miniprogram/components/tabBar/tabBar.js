Component({
  behaviors: [],

  properties: {
    // myProperty: {
    //   type: String,
    //   value: "",
    // },
    // myProperty2: String,
  },

  data: {
    images: [
      {
        key: 0,
        src: "../../icons/info.png",
        url: "../../pages/info/info",
      },
      {
        key: 1,
        src: "../../icons/remind.png",
        url: "../../pages/remind/remind",
      },
      {
        key: 2,
        src: "../../icons/home.png",
        url: "../../pages/home/home",
      },
      {
        key: 3,
        src: "../../icons/locate.png",
        url: "../../pages/locate/locate",
      },
      {
        key: 4,
        src: "../../icons/route.png",
        url: "../../pages/route/route",
      },
    ],
  }, // 私有数据，可用于模板渲染

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
    // 内部方法建议以下划线开头
    _myPrivateMethod: function () {},

    _propertyChange: function (newVal, oldVal) {},
  },
});
