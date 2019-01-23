<h1 align="center">
	<img
		width="300"
		alt="Wevorites"
		src="https://raw.githubusercontent.com/superhos/wevorites/master/doc/img/logo.jpg?sanitize=true">
</h1>

<h3 align="center">
	基于微信聊天机器人为入口内容收藏应用
</h3>

<p align="center">
	<strong>
		<a href="https://github.com/superhos/wevorites">Doc</a>
		•
		<a href="https://wevorites.chenhaotaishuaile.com/view/5c322c6fb29698002ba4396f">Demo</a>
	</strong>
</p>

<p align="center">
  <span>微信机器人</span><a href="https://github.com/superhos/wevorites-bot">项目地址</a>
  <br />
  <span>DEMO</span>
  <br />
  <img
		width="150"
		alt="The QRcode"
		src="https://raw.githubusercontent.com/superhos/wevorites/master/doc/img/code.jpg?sanitize=true">
</p>

<p align="center">
	<br>
	<img
		alt="npm version"
		src="https://img.shields.io/badge/npm-6.4.1-blue.svg">
	<img
		alt="egg.js"
		src="https://img.shields.io/badge/egg.js-2.2.1-green.svg">
	<img
		alt="docker"
		src="https://img.shields.io/badge/docker-18.06.0-orange.svg">
  <img
		alt="Vue.js"
		src="https://img.shields.io/badge/Vue.js-2.5.20-brightgreen.svg">
</p>

<p align="center">
	<img 	src="https://raw.githubusercontent.com/superhos/wevorites/master/doc/img/demo.jpg?sanitize=true" width="550">
</p>

# Overview

【微信用户大都是中文用户，所以README只提供中文。】

Wevorites主要通过微信聊天机器人作为日常文章收藏的入口，再提供应用服务生成个人的收藏馆页面。具体流程如下：

<p align="center">
	<img 	src="https://raw.githubusercontent.com/superhos/wevorites/master/doc/img/flow.jpeg?sanitize=true" width="550">
</p>

<p align="center">
	<img 	src="https://raw.githubusercontent.com/superhos/wevorites/master/doc/img/screen.jpeg?sanitize=true" width="200">
</p>

目前接受公众号分享连接，知乎小程序分享连接，掘金分享连接以及普通网页链接等。
另外，由于web版本微信每次登录获取其他用户的uuid都为0，而UserName每次都会更新，因此引用了**Github Auth**作为用户认证。

## Installation and usage

您可以直接使用Demo中提供的服务，或者自行搭建一个Wevorites服务，具体步骤如下：
1. 拉取项目
````bash
git clone git@github.com:superhos/wevorites.git && cd wevorites
````

2. 安装依赖并配置.env
````bash
npm i
````

3. 启动docker (如电脑上未有Docker服务,请先安装Docker)
````bash
cd docker
docker-compose up -d --build
````
第一次启动时间较长，因为需要build。

4. 拉取机器人项目
````bash
git clone git@github.com:superhos/wevorites-bot.git && cd wevorites-bot
````

5. 安装依赖并配置.env
````bash
npm i
````

6. 启动bot docker 
````bash
cd docker
docker-compose up -d --build
````

7. 通过查看docker log获取机器人登录二维码
````bash
docker logs xxx (docker_bot container id)
````
扫描二维码后，手机确认登录。

8. 用另一个微信号发送消息到机器人，查看效果。

## Roadmap

- [x] 根据用户生成收藏页面
- [x] 收藏网址的状态操作和删除
- [ ] 收藏聚合平台
- [ ] 阅读推荐