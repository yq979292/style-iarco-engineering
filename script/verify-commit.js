// 验证 git commit 提交是否规范的脚本代码
// 运行平台是node

/**
 * 如何实现验证commit 规范
 * 1：读取 git commit 提交的内容
 * 2：编写验证关键字的正则
 * 3：不能通过正则验证的，提示commit提交不规范，让commit失败
 * 注意：本脚本，应该 git commit 完成之前执行。
 * 
 * 问题: 什么时候运行这个脚本？？
 */

// 1：获取git的参数配置，为了获取git commit 的提交呢日哦那个
const msgPath = process.env.HUSKY_GIT_PARAMS;
// 作用：node 工具提示信息设置样式
const chalk = require('chalk');
// 1.5 读取git commit的提交信息
const msg = require('fs')
    .readFileSync(msgPath, 'utf-8')
    .trim()
// 2 验证是否有关键字
const commitRE = /^(feat|fix|docs|style|refactor|perf|test|workflow|build|ci|chore|release|workflow)(\(.+\))?: .{1,50}/

// 3：如果commit msg中没有关键字...
if (!commitRE.test(msg)) {
    // console.log(msg)
    // console.error(`
    //     不合法的 commit 消息格式。
    //     请查看 git commit 提交规范：https://github.com/woai3c/Front-end-articles/blob/master/git%20commit%20style.md
    // `)

    // 优化打印日志
    console.log(msg)
    console.error(
      `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(
        `invalid commit message format.`
      )}\n\n` +
        chalk.red(
          `  Proper commit message format is required for automated changelog generation. Examples:\n\n`
        ) +
        `    ${chalk.green(`feat(compiler): add 'comments' option`)}\n` +
        `    ${chalk.green(
          `fix(v-model): handle events on blur (close #28)`
        )}\n\n` +
        chalk.red(
          `  See https://github.com/vuejs/vue-next/blob/master/.github/commit-convention.md for more details.\n`
        )
    )
    // 结束进程，意味着 git commit 失败了
    process.exit(1)
}