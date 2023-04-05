import axios from 'axios';
import { sendDingtalkMessage } from './utils/dingtalk.js';

axios
  .get(
    'https://www.figma.com/api/search/community_resources?sort_by=relevancy&editor_type=all&query=EasyV+Charts+Components&price=all&creators=all&session_id=unattributed&query_id=lg2ytcxl-fhoz1pccxo8&resource_type=mixed'
  )
  .then(async (res) => {
    const { like_count, duplicate_count } = res.data.meta.results[0].model;

    const message = `Figma's EasyV Charts Components is liked by ${like_count} people, is duplicated by ${duplicate_count} people, detail: https://www.figma.com/community/file/1222735688427337392`;

    await sendDingtalkMessage(message);
  });
