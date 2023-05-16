/*
 * @Author: lee
 * @Date: 2023-05-14 15:44:22
 * @LastEditTime: 2023-05-14 15:46:57
 */
const leeToken = artifacts.require('Lee')

module.exports = function (deployer) {
  deployer.deploy(leeToken, 'lee', 'LEE', 18, '1024000000000000000000')
}