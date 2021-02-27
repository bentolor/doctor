---
title: Documentation
date: 2021-02-22T10:10:32.941Z
icon: ti-book
description: Jump into the documentation of Doctor
type: docs-main
---

<p align="center">
  <img src="https://github.com/estruyf/doctor/actions/workflows/release.yml/badge.svg?branch=main)](https://github.com/estruyf/doctor/actions/workflows/release.yml"
      alt="Does it build and publish?" style="display: inline-block" />

  <a href="https://www.npmjs.com/package/@estruyf/doctor">
    <img src="https://img.shields.io/npm/v/@estruyf/doctor/latest?style=flat-square"
      alt="npm @estruyf/doctor@latest" style="display: inline-block" />
  </a>
  
  <a href="https://www.npmjs.com/package/@estruyf/doctor">
    <img src="https://img.shields.io/npm/v/@estruyf/doctor/next?style=flat-square"
      alt="npm @estruyf/doctor@next" style="display: inline-block" />
  </a>
</p>

`Doctor` was originally created for having a uniformal way of providing the documentation internally at Valo Solutions. The main driver for `doctor` was to dogfood the Valo products and make it easier for users to maintain documentation on SharePoint.

As we understand that it is not the best experience for developers to write documentation on SharePoint, we created this tool to simplify the process. `Doctor` allows developers to use tools/applications they are used to, like VSCode and Markdown, and still provide the information on your SharePoint environment.

`Doctor` follows the concept of many Static Site Generators. These generators make it possible to write your articles/documentation in Markdown and convert them to HTML files. 

`Doctor` is a bit different, as instead of creating HTML files, it makes SharePoint pages instead. 

Under the hood, it makes use of the [CLI for Microsoft 365](https://pnp.github.io/cli-microsoft365/).

> Today `doctor` is maintained by `Elio Struyf`. Feel free to join the project if you have interest in.