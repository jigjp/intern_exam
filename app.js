const csv2json = require('csv2json')
const axios = require('axios')
const Iconv = require('iconv').Iconv;
const sjis = new Iconv('SJIS', 'UTF-8//TRANSLIT//IGNORE');
const str = require('string-to-stream')
const fs = require('fs')

axios.get('http://www.pref.fukui.lg.jp/doc/toukei-jouhou/opendata/list_6_d/fil/event1.csv',{
  responseType      : 'arraybuffer',
  transformResponse : [(data) => {
  return sjis.convert(data).toString();
  }],
})
  .then(res => {
    str(res.data)
      .pipe(csv2json())
      .pipe(fs.createWriteStream('./fukui_event.json'))
  })
