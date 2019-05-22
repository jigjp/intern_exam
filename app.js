const axios = require('axios')
const Iconv = require('iconv').Iconv;
const sjis = new Iconv('SJIS', 'UTF-8//TRANSLIT//IGNORE');
const fs = require('fs')

const parse = require('csv-parse')

axios.get('http://www.pref.fukui.lg.jp/doc/toukei-jouhou/opendata/list_6_d/fil/event1.csv',{
  responseType      : 'arraybuffer',
  transformResponse : [(data) => {
  return sjis.convert(data).toString();
  }],
})
  .then(res => {
    parse(res.data, {
      columns: [
        'event_name',
        'description',
        'remarks',
        'category',
        'start_date',
        'end_date',
        'contact',
        'contact_phone_number',
        'event_place',
        'event_place_url',
        '__ignore__',
        '__ignore__',
        'address',
        '__ignore__',
        'mail_address',
        'transportation',
        '__ignore__',
        '__ignore__',
        '__ignore__'
      ]
    }, function(err, records){
      records.forEach(r => delete r.__ignore__)

      fs.writeFileSync('fukui_event.json', JSON.stringify(records.slice(1)))
    })
  })
