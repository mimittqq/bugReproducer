一个为了复现内部系统线上 bug 而制定的小插件
process:
- [ ] 在用户界面插入一个可拖拽的"报告 bug"按钮
- [x] 记录用户最近x次的操作轨迹(x 默认为20)
- [ ] ? 记录视频
- [ ] 点击"报告 bug"按钮后, 把开发者设定的需要记录的数据传到相应回调函数中, 并打印在控制台上