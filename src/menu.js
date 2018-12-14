var menus = [
  {
    action: "list",
    title: "项目集合",
    active: false,
    path: "/collections",
    items: [
      { title: "项目列表", path: "/projectList" },
      { title: "服务列表", path: "/serviceList" },
      { title: "接口列表", path: "/apiList" },
      { title: "全局接口", path: "/globalApiList" },
    ]
  },
  {
    action: "dns",
    title: "DNS配置",
    active: false,
    path:"/dnsConfig",
    items: [
      { title: "DNS列表", path: "/dnsList" },
    ]
  },
  {
    action: "settings_applications",
    title: "测试流程",
    active: false,
    path:"/testFlows",
    items: [
      { title: "流程列表", path: "/processList" },
      { title: "历史记录", path: "/historyList" },
      { title: "定时管理", path: "/scheduleList"},
    ]
  }
]

export default menus;
