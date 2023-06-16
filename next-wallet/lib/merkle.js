/*
 * @Author: lee
 * @Date: 2023-06-03 21:50:46
 * @LastEditTime: 2023-06-03 22:38:22
 */
const crypto = require('crypto')
const R = require('ramda')
const fetchLatestBlock = () =>
  fetch("https://blockchain.info/latestblock")
    .then((r) => r.json())
    .then((r) => r.hash);

const fetchMerkleRootAndTransactions = (block_hash) =>
  fetch(`https://blockchain.info/rawblock/${block_hash}`)
    .then(r => r.json())
    .then(d => [d.mrkl_root, d.tx.map(t => t.hash)])
// 叶子节点
const hashPair = (a, b = a) => {
  // 小端序
  const bytes = Buffer.from(`${b}${a}`, 'hex').reverse()
  const hash = crypto.createHash('sha256').update(bytes)
  const hashagain = crypto.createHash('sha256').update(hash.digest('bytes')).digest('bytes')
  return hashagain.reverse().toString('hex')
}

const merkleRoot = txs =>
  txs.length === 1 ? txs[0] : merkleRoot(R.splitEvery(2, txs).reduce((tree, pair) => [...tree, hashPair(...pair)], []))
fetchLatestBlock().then(fetchMerkleRootAndTransactions).then(([root, txs]) => {
  const isValid = merkleRoot(txs) === root;
  return (isValid)
})
export async function getRoot() {
  return await fetchLatestBlock().then(fetchMerkleRootAndTransactions).then(([root, txs]) => {
    const isValid = merkleRoot(txs) === root;
    return (isValid)
  })
}