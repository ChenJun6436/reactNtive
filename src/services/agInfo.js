import { Post } from '../utils/request';
import Input from 'antd-mobile-rn/lib/input-item/Input.native';

//获取农技   所有信息
export async function getAg(data) {
  return Post(`/Api/Content/GetPageList`, {
    body: JSON.stringify(data)
  });
}

//获取农技   所有详情
export async function getAgDetail(data) {
  return Post(`/Api/Content/GetDetail`, {
    body: JSON.stringify(data)
  });
}

//获取评论分页 
export async function getAgComment(data) {
  return Post(`/Api/Content/GetCommentPageList`, {
    body: JSON.stringify(data)
  });
}

//添加评论
export async function addComment(data) {
  return Post(`/Api/Content/AddComment`, {
    body: JSON.stringify(data)
  });
}

//获取回复
export async function getCommentDetail(data) {
  return Post(`/Api/Content/GetCommentDetail`, {
    body: JSON.stringify(data)
  }
  );
}

//添加回复
export async function addReply(data) {
  return Post(`/Api/Content/AddReply`, {
    body: JSON.stringify(data)
  }
  );
}

//添加状态
export async function actionRecord(data) {
  return Post(`/Api/User/ActionRecord`, {
    body: JSON.stringify(data)
  }
  );
}