# 基估宝 - 实时基金估值（增强版） (Real-time Fund Valuation Enhanced)

一个基于 [hzm0321/real-time-fund](https://github.com/hzm0321/real-time-fund) 修改的增强版基金估值与持仓管理工具。在保留原版所有功能的基础上，新增持仓管理、分组功能、市场指数、用户反馈等特性，仍为纯前端应用，采用玻璃拟态设计，支持移动端适配。

**衍生版本说明**：本项目是基于 [hzm0321/real-time-fund](https://github.com/hzm0321/real-time-fund) 的开源项目进行修改和功能增强的版本。所有原始功能保持不变，新增功能旨在提供更完整的基金投资管理体验。原项目采用 AGPL-3.0 开源协议，本衍生版本同样遵循该协议。

预览地址：
基金页面 ：[https://nick-job.github.io/Real-time-fund-Revise/](https://nick-job.github.io/Real-time-fund-Revise/)
行情页面：[https://nick-job.github.io/Real-time-fund-Revise/market](https://nick-job.github.io/Real-time-fund-Revise/market)


## ✨ 特性

### 原版核心功能（全部保留）
- **实时估值**：通过输入基金编号，实时获取并展示基金的单位净值、估值净值及实时涨跌幅。
- **重仓追踪**：自动获取基金前 10 大重仓股票，并实时追踪重仓股的盘中涨跌情况。支持收起/展开展示。
- **纯前端运行**：采用 JSONP 方案直连东方财富、腾讯财经等公开接口，彻底解决跨域问题，支持在 GitHub Pages 等静态环境直接部署。
- **本地持久化**：使用 `localStorage` 存储已添加的基金列表及配置信息，刷新不丢失。
- **响应式设计**：完美适配 PC 与移动端。针对移动端优化了文字展示、间距及交互体验。
- **自选功能**：支持将基金添加至“自选”列表，通过 Tab 切换展示全部基金或仅自选基金。自选状态支持持久化及同步清理。
- **可自定义频率**：支持设置自动刷新间隔（5秒 - 300秒），并提供手动刷新按钮。

### 增强版新增功能
- **持仓管理**：记录每只基金的持有份额、成本价，实时计算持仓盈亏、收益率、累计收益。
- **交易模拟**：支持加仓、减仓操作模拟，考虑买入费率、交易时段（15:00前后）影响。
- **分组管理**：创建自定义分组，拖拽排序分组，将基金归类到不同分组中管理。
- **市场指数**：实时展示上证指数、深证成指、创业板指等主要A股指数行情。
- **用户反馈**：内置反馈表单，支持用户提交问题或建议（通过 Web3Forms 服务）。
- **捐赠支持**：集成捐赠入口，支持开发者持续维护。
- **数据分析**：集成 Google Analytics（需配置 GA ID），便于了解使用情况。
- **日期选择器**：内置日历组件，方便选择交易日期。
- **数字滚动动画**：估值数字变化时具有平滑滚动动画效果。

## 🛠 技术栈

- **框架**：[Next.js](https://nextjs.org/) (App Router)
- **样式**：原生 CSS (Global CSS) + 玻璃拟态设计
- **动画**：[framer-motion](https://www.framer.com/motion/) 提供流畅交互动画
- **图表**：[ECharts](https://echarts.apache.org/) + [echarts-for-react](https://github.com/hustcc/echarts-for-react) 用于数据可视化
- **数据源**：
  - 基金估值：天天基金 (JSONP)
  - 重仓数据：东方财富 (HTML Parsing)
  - 股票行情：腾讯财经 (Script Tag Injection)
  - 市场指数：腾讯财经接口
- **部署**：GitHub Actions + GitHub Pages（静态导出）

## 🚀 快速开始

### 环境变量配置（可选）
如需使用反馈功能，需配置 Web3Forms Access Key：
```bash
# 创建 .env.local 文件
WEB3FORMS_ACCESS_KEY=your_access_key_here
```

### 本地开发

1. 克隆仓库：
   ```bash
   git clone https://github.com/your-username/real-time-fund.git
   cd real-time-fund
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

3. 运行开发服务器：
   ```bash
   npm run dev
   ```
   访问 [http://localhost:3000](http://localhost:3000) 查看效果。

### 构建与部署

本项目已配置 GitHub Actions。每次推送到 `main` 分支时，会自动执行构建并部署到 GitHub Pages。

若要手动构建：
```bash
npm run build
```
静态文件将生成在 `out` 目录下。

## 📖 使用说明

### 基础操作（与原版一致）
1. **添加基金**：在顶部输入框输入 6 位基金代码（如 `110022`），点击"添加"。
2. **查看详情**：卡片将展示实时估值及前 10 重仓股的占比与今日涨跌。
3. **调整频率**：点击右上角"设置"图标，可调整自动刷新的间隔时间。
4. **删除基金**：点击卡片右上角的红色删除图标即可移除。

### 增强功能使用
1. **设置持仓**：点击基金卡片右上角的"持仓"按钮，输入持有份额和成本价。
2. **交易模拟**：在持仓操作菜单中选择"加仓"或"减仓"，填写金额/份额、费率等参数。
3. **分组管理**：点击左上角分组下拉菜单，进入"管理分组"创建、重命名、排序分组。
4. **添加基金到分组**：在分组内点击"+"按钮，从已有基金中选择添加到当前分组。
5. **查看市场指数**：点击顶部导航栏的"市场"标签，查看实时指数行情。
6. **提交反馈**：点击右下角设置图标，选择"意见反馈"提交问题或建议。

## 📝 免责声明

本项目所有数据均来自公开接口，仅供个人学习及参考使用。数据可能存在延迟，不作为任何投资建议。

**特别提醒**：持仓管理、交易模拟等功能仅为记录和计算工具，不构成实际投资建议。基金投资有风险，入市需谨慎。

## 📄 开源协议 (License)

本项目基于 [hzm0321/real-time-fund](https://github.com/hzm0321/real-time-fund) 修改，遵循原项目的 **[GNU Affero General Public License v3.0](https://www.gnu.org/licenses/agpl-3.0.html)**（AGPL-3.0）开源协议。

- **允许**：自由使用、修改、分发本软件；若你通过网络服务向用户提供基于本项目的修改版本，须向该服务的用户提供对应源代码。
- **要求**：基于本项目衍生或修改的作品需以相同协议开源，并保留版权声明与协议全文。
- **无担保**：软件按「原样」提供，不提供任何明示或暗示的担保。

完整协议文本见仓库根目录 [LICENSE](./LICENSE) 文件，或 [GNU AGPL v3 官方说明](https://www.gnu.org/licenses/agpl-3.0.html)。

### 版权说明
- 原项目版权归 [hzm](https://github.com/hzm0321) 所有
- 本增强版的修改部分版权归修改者所有
- 所有贡献者保留其贡献部分的版权

---
基于 [hzm0321/real-time-fund](https://github.com/hzm0321/real-time-fund) 修改  
增强版维护者：[Your Name](https://github.com/your-username)
