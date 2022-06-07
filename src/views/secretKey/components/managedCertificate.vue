<template>
  <div class="managedCertificate">
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column label="订单明细凭证号">
        <template slot-scope="scope">
          <span style="">{{ scope.row.oriObjectID }}</span>
        </template>
      </el-table-column>
      <el-table-column label="证书模板">
        <template slot-scope="scope">
          <span style="">{{ scope.row.keyModelID }}</span>
        </template>
      </el-table-column>
      <el-table-column label="证书序号" width="80">
        <template slot-scope="scope">
          <span style="margin-right: 10px">{{ scope.row.KEYINDEX }}</span>
        </template>
      </el-table-column>
      <el-table-column label="截至有效日期" width="180">
        <template slot-scope="scope">
          <span style="">{{ scope.row.endActiveDate }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="环境">
        <template slot-scope="scope">
          <span style="">{{ scope.row.DEVID }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="状态" width="180">
        <template slot-scope="scope">
          <span style="">{{ scope.row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" class-name="btnBox">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleRandomCreateKeyPair(scope.$index, scope.row)"
            >随机生成密钥对</el-button
          >
          <el-button
            size="mini"
            @click="handleIssueCertificate(scope.$index, scope.row)"
            >签发证书</el-button
          >
          <el-button
            size="mini"
            @click="handleDownloadCertificate(scope.$index, scope.row)"
            >下载证书</el-button
          >
          <el-button size="mini" @click="handleRenewal(scope.$index, scope.row)"
            >续费</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <order-renewal ref="renewalShow"></order-renewal>
  </div>
</template>

<script>
import orderRenewal from '@/components/orderRenewal.vue'
import {
  queryCertificateById,
  randomCreateKeyPair,
  IssueCertificates,
  downloadCertificateFile,
} from '@/api/key'
import { Message, MessageBox } from 'element-ui'
export default {
  name: 'managedCertificate',
  components: {
    orderRenewal,
  },
  props: {},
  data() {
    return {
      loading: false,
      tableData: [],
      renewalData: {},
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getCertificateById()
  },
  mounted() {},
  methods: {
    getCertificateById() {
      this.loading = true
      queryCertificateById({
        currentPage: 1,
        pageSize: 10,
      }).then(res => {
        console.log('查询证书列表:', res.data)
        let data = res.data.queryCertificateById.map(item => {
          return {
            ...item,
          }
        })
        data.forEach(item => {
          this.tableData.push(item)
        })
        this.loading = false
      })
    },
    handleRandomCreateKeyPair(index, row) {
      console.log(index, row)
      // companyName:北京江南天安科技有限公司
      // projectName:Splenwise云密码服务平台
      // keyModelID:数字签名证书-X509证书-SM2
      // compName:采购云密码服务的企业
      // devID:生产环境
      // ITCompInstName:210804103316152366
      // keyIndex:1
      // keyOperationID:1001
      // srlIDForEngine:Splenwise统一密码基础设施和服务平台
      // busiNameForEngine:安全方案实施管理
      // miniProcNameForEngine:随机生成密钥-强制
      // KEEPCURRENTKEYENDDATE:1
      // GENERATEKEYFORCUSTOMERANYWAY:1
      // busiFunNameForEngine:随机生成密钥
      let data = {
        companyName: '北京江南天安科技有限公司',
        projectName: 'Splenwise云密码服务平台',
        keyModelID: row.keyModelID,
        compName: '采购云密码服务的企业',
        devID: row.DEVID,
        ITCompInstName: row.ITCompInstName,
        keyIndex: row.KEYINDEX,
        keyOperationID: '1001',
        srlIDForEngine: 'Splenwise统一密码基础设施和服务平台',
        busiNameForEngine: '安全方案实施管理',
        miniProcNameForEngine: '随机生成密钥-强制',
        KEEPCURRENTKEYENDDATE: '1',
        GENERATEKEYFORCUSTOMERANYWAY: '1',
        busiFunNameForEngine: '随机生成密钥',
      }
      console.log('data', data)
      MessageBox.confirm('是否随机生成密钥对, 是否确认?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          randomCreateKeyPair(data).then(res => {
            console.log('随机生成密钥对:', res.data)
            if (res.data.rs === '1') {
              Message({
                showClose: true,
                message: '随机生成密钥对成功',
                type: 'success',
              })
              // 重新获取列表
              this.tableData = []
              this.getCertificateById()
            } else {
              console.log('随机生成密钥对-失败:', res.data.rs)
              Message({
                showClose: true,
                message: `随机生成密钥对失败${res.data.rs}`,
                type: 'error',
              })
            }
          })
        })
        .catch(() => {
          Message({
            type: 'info',
            message: '已取消',
          })
        })
    },
    handleIssueCertificate(index, row) {
      console.log(index, row)
      // companyName:北京江南天安科技有限公司
      // projectName:Splenwise云密码服务平台
      // keyModelID:数字签名证书-X509证书-SM2
      // compName:采购云密码服务的企业
      // devID:生产环境
      // ITCompInstName:210804103316152366
      // keyIndex:1
      // keyOperationID:19
      // srlIDForEngine:Splenwise统一密码基础设施和服务平台
      // busiNameForEngine:安全方案实施管理
      // busiFunNameForEngine:线下签发证书
      // miniProcNameForEngine:签发证书-强制
      // KEEPCURRENTKEYENDDATE:1
      // GENERATEKEYFORCUSTOMERANYWAY:1
      // KEYOPERATIONSTATUS:4
      // certUser:签发用户
      // endActiveDate:20220518

      // 格式化日期 2023-01-20日期格式为yyyyMMdd
      let date = row.endActiveDate
      let year = date.substring(0, 4)
      let month = date.substring(4, 6)
      let day = date.substring(6, 8)
      let endActiveDate = `${year}${month}${day}`

      let data = {
        companyName: '北京江南天安科技有限公司',
        projectName: 'Splenwise云密码服务平台',
        keyModelID: row.keyModelID,
        compName: '采购云密码服务的企业',
        devID: row.DEVID,
        ITCompInstName: row.ITCompInstName,
        keyIndex: row.KEYINDEX,
        keyOperationID: '19',
        srlIDForEngine: 'Splenwise统一密码基础设施和服务平台',
        busiNameForEngine: '安全方案实施管理',
        busiFunNameForEngine: '线下签发证书',
        miniProcNameForEngine: '签发证书-强制',
        KEEPCURRENTKEYENDDATE: '1',
        GENERATEKEYFORCUSTOMERANYWAY: '1',
        KEYOPERATIONSTATUS: '4',
        certUser: '签发用户',
        endActiveDate: endActiveDate,
      }
      console.log('data', data)
      MessageBox.confirm('是否使用当前密钥对签发证书, 是否确认?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          IssueCertificates(data).then(res => {
            console.log('签发证书:', res.data)
            if (res.data.rs === '1') {
              Message({
                showClose: true,
                message: '签发证书成功',
                type: 'success',
              })
              // 重新获取列表
              this.tableData = []
              this.getCertificateById()
            } else {
              console.log('签发证书-失败:', res.data.rs)
              Message({
                showClose: true,
                message: `签发证书失败${res.data.rs}`,
                type: 'error',
              })
            }
          })
        })
        .catch(() => {
          Message({
            type: 'info',
            message: '已取消',
          })
        })
    },
    handleDownloadCertificate(index, row) {
      // companyName:北京江南天安科技有限公司
      // projectName:Splenwise云密码服务平台
      // keyModelID:数字签名证书-X509证书-SM2
      // compName:采购云密码服务的企业
      // devID:生产环境
      // ITCompInstName:210804103316152366
      // keyIndex:1
      // fileName:download.file
      let data = {
        companyName: '北京江南天安科技有限公司',
        projectName: 'Splenwise云密码服务平台',
        keyModelID: row.keyModelID,
        compName: '采购云密码服务的企业',
        devID: row.DEVID,
        ITCompInstName: row.ITCompInstName,
        keyIndex: row.KEYINDEX,
        fileName: 'download.file',
      }
      console.log('下载证书data', data)
      downloadCertificateFile(data).then(res => {
        console.log('下载证书:', res.data)
        // if (res.data.rs === '1') {
        let fileData = res.data.fileData
        let fileName = res.data.fileName
        console.log('下载证书链接:', fileData)
        // 创建a标签
        var elementA = document.createElement('a')

        //文件的名称为时间戳加文件名后缀
        elementA.download = fileName
        elementA.style.display = 'none'

        //生成一个blob二进制数据，内容为json数据
        var blob = new Blob([fileData])

        //生成一个指向blob的URL地址，并赋值给a标签的href属性
        elementA.href = URL.createObjectURL(blob)
        document.body.appendChild(elementA)
        elementA.click()
        document.body.removeChild(elementA)

        // 下载文件
        // const a_link = document.createElement('a') // 生成一个a链接
        // fetch(downloadLink) // 括号里是文件链接
        //   .then(res => res.blob())
        //   .then(blob => {
        //     // 将链接地址字符内容转变成blob地址
        //     a_link.href = URL.createObjectURL(blob)
        //     // console.log(a_link.href)
        //     a_link.download = fileName //下载的文件的名字
        //     document.body.appendChild(a_link)
        //     a_link.click()
        //   })

        Message({
          showClose: true,
          message: '下载证书成功',
          type: 'success',
        })
        // } else {
        //   console.log('下载证书-失败:', res.data.rs)
        //   Message({
        //     showClose: true,
        //     message: `下载证书失败${res.data.rs}`,
        //     type: 'error',
        //   })
        // }
      })
    },
    handleRenewal(index, row) {
      console.log(index, row)
      this.renewalData = row
      // 打开续费弹窗
      this.$refs.renewalShow.showRenewal(this.renewalData)
    },
  },
}
</script>

<style scoped lang="less">
.btnBox {
  .el-button {
    margin: 5px;
  }
}
</style>
