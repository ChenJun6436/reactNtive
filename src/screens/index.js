// @flow

import Login from './Login';
import Disclaimer from './Login/Disclaimer';//免责申明
import Register from './Register';
import SetRegisterCode from './Register/SetRegisterCode';//注册获取验证码
import SetRegisterPwd from './Register/SetRegisterPwd';//注册设置密码
import SetNewCode from './ForgetPassword/SetNewCode';//忘记密码获取验证码
import SetNewPwd from './ForgetPassword/SetNewPwd';//忘记密码设置密码
import ForgetPassword from './ForgetPassword';
import Home from './Home';
import CitySelect from './Home/CitySelect';
import Build from './Build';
import Test from './Test';
import Mine from './Mine/index';
import MineRegion from './Mine/MineRegion';
import MineType from './Mine/MineType';
import MineEditor from './Mine/MineEditor';
import MinePlant from './Mine/MinePlant';
import PublishAdd from './Mine/MinePublish/PublishAdd'
import PublishDetail from './Mine/MinePublish/Details'
import MinePublish from './Mine/MinePublish'
import EditUserInfo from './EditUserInfo';//完善个人信息
import AgInfo from './AgInfo';
import AgInfoDetail from './AgInfo/AgInfoDetail';
// import AgMic from './AgMic';
// import AgMicDetail from './AgMic/AgMicDetail';
import UserRegion from './EditUserInfo/UserRegion';
import UserType from './EditUserInfo/UserType';
import CommentDetail from './CommentDetail'
//农户画像
import FarmersPortrait from './FarmersPortrait';//农资店列表
import FarmStore from './FarmersPortrait/FarmStore';//农资店列表
import PurchaseRecord from './FarmersPortrait/PurchaseRecord';//购买记录
import RecordDetail from './FarmersPortrait/PurchaseRecord/RecordDetail'
import GoodsEvaluate from './FarmersPortrait/PurchaseRecord/RecordDetail/GoodsEvaluate'
import Taxonomy from './FarmersPortrait/Taxonomy';//购买记录
import Diagnosis from './Diagnosis';//智能诊单
import ERPDiagnosis from './ERPDiagnosis';//ERP智能诊单 
import ERPDiagnosisDetail from './ERPDiagnosis/ERPDiagnosisDetail';
import ERPDiaDetail from './ERPDiagnosis/ERPDiagnosisDetail/Details';
import ERPDiaDetailSearch from './ERPDiagnosis/Search';
import DiaSearchList from './ERPDiagnosis/DiaSearchList';
import ERPUploadImage from './ERPDiagnosis/ERPUploadImage';
import BuyProduct from './BuyProduct';//卖农资  
import StoreDetail from './BuyProduct/StoreList/StoreDetail';
import AddStore from './BuyProduct/StoreList/AddStore'
import ProductDetail from './BuyProduct/HotProduct/ProductDetail';
import BarcodeScanner from './BarcodeScanner';//辨真假  
import BarcodeWeb from './BarcodeScanner/Web';
import Distinguish from './Distinguish';//识别
import Photograp from './Distinguish/Photograp';//识别
import DigResult from './Distinguish/DigResult';
import DigDetail from './Distinguish/DigDetail';
import AddCrop from './Crop/AddCrop' //新增关注作物
import ListCrop from './Crop/ListCrop' //我关注作物
import DetailCrop from './Crop/DetailCrop' //关注作物详情
import AddLand from './Land/AddLand' //新增土地
import ListLand from './Land/ListLand' //我的土地
import DetailLand from './Land/DetailLand' //土地详情
import Solution from './Solution';//解决方案
import SolutionDetail from './Solution/Details'//解决方案详情
import SolutionSearch from './Solution/Search'//解决方案搜索
import SolSearchList from './Solution/SolSearchList'//解决方案搜索列表
import MedicationRecord from './MedicationRecord'
import AddMAR from './MedicationRecord/AddOrEdit'
import MARGoods from './MedicationRecord/AddOrEdit/GoodsPage'//选择农药
import MARCrops from './MedicationRecord/AddOrEdit/CropPage'//选择农药
import DetailMAR from './MedicationRecord/Detail'
import PesticidesList from './PesticidesList'

import ERPDiaList from './ERPDiaList'
import ERPDiaPest from './ERPDiaList/ERPDiaPest'

import SearchGround from './SearchGround'//土壤选择

//回收
import AddRecovery from './Recovery/AddRecovery';


// 农产品数据认证
import AllMenu from './DataAuthentication/AllMenu';// 全部菜单
import Base from './DataAuthentication/Base';// 基地
import EnterpriseSituation from './DataAuthentication/EnterpriseSituation'; // 企业情况-详情
import BaseDetail from './DataAuthentication/Base/Detail';// 基地详情
import AddBase from './DataAuthentication/Base/AddOrEdit';// 添加基地
import ChooseAddress from './DataAuthentication/Base/AddOrEdit/ChooseAddress';// 选择地址
import AddressAutoComplete from './DataAuthentication/Base/AddOrEdit/AddressAutoComplete'
import LandManage from './DataAuthentication/Base/AddOrEdit/LandManage' ;//地块管理
import EnterpriseList from './DataAuthentication/EnterpriseSituation/list'; // 企业列表
import IntBuyRecord from './DataAuthentication/IntBuyRecord' //投入品购买记录
import IntBuyRecordAdd from './DataAuthentication/IntBuyRecord/Add' //新增投入品购买
import IntBuyRecordDetail from './DataAuthentication/IntBuyRecord/Details' //投入品购买详情
import IntBuyRecordBuy from './DataAuthentication/IntBuyRecord/Buy' //选择投入品

import IntUseRecord from './DataAuthentication/IntUseRecord' //使用记录
import IntUseRecordAdd from './DataAuthentication/IntUseRecord/Add' //新增投入品使用
import IntUseRecordDetail from './DataAuthentication/IntUseRecord/Details' //投入品使用详情
import TestRecord from './DataAuthentication/TestRecord' //检测记录
import TestRecordAdd from './DataAuthentication/TestRecord/Add' //新增检测记录
import TestRecordDetail from './DataAuthentication/TestRecord/Details' //检测记录详情
import WorkRecord from './DataAuthentication/WorkRecord' //用工记录
import WorkRecordAdd from './DataAuthentication/WorkRecord/Add' //新增用工记录
import WorkRecordDetail from './DataAuthentication/WorkRecord/Details' //用工记录详情

import GardenAdd from './DataAuthentication/Garden/Add' //新增园区
import GardenDetail from './DataAuthentication/Garden/Details' //园区详情
import Garden from './DataAuthentication/Garden' //园区
import GardenCrop from './DataAuthentication/GardenCrop' //作物种植
import GardenCropAdd from './DataAuthentication/GardenCrop/Add' //新增种植
import GardenCropDetail from './DataAuthentication/GardenCrop/Details' //种植详情

import ProductRecoveryAdd from './DataAuthentication/ProductRecovery/Add' //新增采摘
import ProductRecoveryDetail from './DataAuthentication/ProductRecovery/Details' //采摘详情
import ProductRecovery from './DataAuthentication/ProductRecovery' //采摘记录

import ProductSaleAdd from './DataAuthentication/ProductSale/Add' //新增销售
import ProductSaleDetail from './DataAuthentication/ProductSale/Details' //销售详情
import ProductSale from './DataAuthentication/ProductSale' //销售记录

import StaffAdd from './DataAuthentication/Staff/Add' //新增销售
import StaffDetail from './DataAuthentication/Staff/Details' //销售详情
import Staff from './DataAuthentication/Staff' //销售记录

export function registerScreens() {

  Navigation.registerComponent(Global.Screens.CitySelect.name, () => CitySelect);
  Navigation.registerComponent(Global.Screens.Login.name, () => Login);
  Navigation.registerComponent(Global.Screens.Disclaimer.name, () => Disclaimer);
  Navigation.registerComponent(Global.Screens.Register.name, () => Register);
  Navigation.registerComponent(Global.Screens.SetRegisterCode.name, () => SetRegisterCode);
  Navigation.registerComponent(Global.Screens.SetRegisterPwd.name, () => SetRegisterPwd);

  Navigation.registerComponent(Global.Screens.ForgetPassword.name, () => ForgetPassword);
  Navigation.registerComponent(Global.Screens.SetNewCode.name, () => SetNewCode);
  Navigation.registerComponent(Global.Screens.SetNewPwd.name, () => SetNewPwd);
  //个人信息
  Navigation.registerComponent(Global.Screens.Mine.name, () => Mine);
  Navigation.registerComponent(Global.Screens.MineRegion.name, () => MineRegion);
  Navigation.registerComponent(Global.Screens.MineType.name, () => MineType);
  //个人信息-编辑
  Navigation.registerComponent(Global.Screens.MineEditor.name, () => MineEditor);
  //我的种植
  Navigation.registerComponent(Global.Screens.MinePlant.name, () => MinePlant);
  //我的发布
  Navigation.registerComponent(Global.Screens.MinePublish.name, () => MinePublish);
  //新增发布
  Navigation.registerComponent(Global.Screens.PublishAdd.name, () => PublishAdd);
  //发布详情
  Navigation.registerComponent(Global.Screens.PublishDetail.name, () => PublishDetail);
  //开发中
  Navigation.registerComponent(Global.Screens.Build.name, () => Build);
  //新增关注作物
  Navigation.registerComponent(Global.Screens.AddCrop.name, () => AddCrop);
  //关注作物列表
  Navigation.registerComponent(Global.Screens.ListCrop.name, () => ListCrop);
  //关注作物列表
  Navigation.registerComponent(Global.Screens.DetailCrop.name, () => DetailCrop);
  //新增土地
  Navigation.registerComponent(Global.Screens.AddLand.name, () => AddLand);
  //土地列表
  Navigation.registerComponent(Global.Screens.ListLand.name, () => ListLand);
  //土地列表
  Navigation.registerComponent(Global.Screens.DetailLand.name, () => DetailLand);
  Navigation.registerComponent(Global.Screens.EditUserInfo.name, () => EditUserInfo);
  Navigation.registerComponent(Global.Screens.Test.name, () => Test);
  Navigation.registerComponent(Global.Screens.UserRegion.name, () => UserRegion);
  Navigation.registerComponent(Global.Screens.UserType.name, () => UserType);

  //首页
  Navigation.registerComponent(Global.Screens.Home.name, () => Home);
  //农业资讯主页
  Navigation.registerComponent(Global.Screens.AgInfo.name, () => AgInfo);
  //农业资讯详情
  Navigation.registerComponent(Global.Screens.AgInfoDetail.name, () => AgInfoDetail);
  //农技微课主页
  // Navigation.registerComponent(Global.Screens.AgMic.name, () => AgMic);
  // //农技微课详情
  // Navigation.registerComponent(Global.Screens.AgMicDetail.name, () => AgMicDetail);
  //回复
  Navigation.registerComponent(Global.Screens.CommentDetail.name, () => CommentDetail);

  //农资店
  Navigation.registerComponent(Global.Screens.FarmersPortrait.name, () => FarmersPortrait);
  Navigation.registerComponent(Global.Screens.FarmStore.name, () => FarmStore);
  Navigation.registerComponent(Global.Screens.PurchaseRecord.name, () => PurchaseRecord);
  Navigation.registerComponent(Global.Screens.RecordDetail.name, () => RecordDetail);
  Navigation.registerComponent(Global.Screens.GoodsEvaluate.name, () => GoodsEvaluate);
  Navigation.registerComponent(Global.Screens.Taxonomy.name, () => Taxonomy);
  Navigation.registerComponent(Global.Screens.Diagnosis.name, () => Diagnosis);
  Navigation.registerComponent(Global.Screens.BuyProduct.name, () => BuyProduct);
  Navigation.registerComponent(Global.Screens.StoreDetail.name, () => StoreDetail);
  //新增农资店
  Navigation.registerComponent(Global.Screens.AddStore.name, () => AddStore);
  Navigation.registerComponent(Global.Screens.ProductDetail.name, () => ProductDetail);
  Navigation.registerComponent(Global.Screens.ERPDiagnosis.name, () => ERPDiagnosis);
  Navigation.registerComponent(Global.Screens.ERPDiagnosisDetail.name, () => ERPDiagnosisDetail);
  Navigation.registerComponent(Global.Screens.ERPDiaDetail.name, () => ERPDiaDetail);
  Navigation.registerComponent(Global.Screens.ERPDiaDetailSearch.name, () => ERPDiaDetailSearch);
  Navigation.registerComponent(Global.Screens.ERPUploadImage.name, () => ERPUploadImage);
  Navigation.registerComponent(Global.Screens.DiaSearchList.name, () => DiaSearchList);
  Navigation.registerComponent(Global.Screens.BarcodeScanner.name, () => BarcodeScanner);
  Navigation.registerComponent(Global.Screens.BarcodeWeb.name, () => BarcodeWeb);
  Navigation.registerComponent(Global.Screens.Distinguish.name, () => Distinguish);
  Navigation.registerComponent(Global.Screens.Photograp.name, () => Photograp);
  Navigation.registerComponent(Global.Screens.DigResult.name, () => DigResult);
  Navigation.registerComponent(Global.Screens.DigDetail.name, () => DigDetail);
  Navigation.registerComponent(Global.Screens.Solution.name, () => Solution);
  Navigation.registerComponent(Global.Screens.SolutionDetail.name, () => SolutionDetail);
  Navigation.registerComponent(Global.Screens.SolutionSearch.name, () => SolutionSearch);
  Navigation.registerComponent(Global.Screens.SolSearchList.name, () => SolSearchList);
  Navigation.registerComponent(Global.Screens.MedicationRecord.name, () => MedicationRecord);
  Navigation.registerComponent(Global.Screens.AddMAR.name, () => AddMAR);
  Navigation.registerComponent(Global.Screens.MARGoods.name, () => MARGoods);
  Navigation.registerComponent(Global.Screens.MARCrops.name, () => MARCrops);
  Navigation.registerComponent(Global.Screens.DetailMAR.name, () => DetailMAR);
  Navigation.registerComponent(Global.Screens.PesticidesList.name, () => PesticidesList);

  Navigation.registerComponent(Global.Screens.ERPDiaList.name, () => ERPDiaList);
  Navigation.registerComponent(Global.Screens.ERPDiaPest.name, () => ERPDiaPest);

  Navigation.registerComponent(Global.Screens.SearchGround.name, () => SearchGround);
  //回收
  Navigation.registerComponent(Global.Screens.AddRecovery.name, () => AddRecovery);

  // 农产品数据认证
  Navigation.registerComponent(Global.Screens.AllMenu.name, () => AllMenu);// 全部菜单
  Navigation.registerComponent(Global.Screens.Base.name, () => Base);// 基地
  Navigation.registerComponent(Global.Screens.EnterpriseSituation.name, () => EnterpriseSituation); // 企业详情
  Navigation.registerComponent(Global.Screens.BaseDetail.name, () => BaseDetail);// 基地详情
  Navigation.registerComponent(Global.Screens.AddBase.name, () => AddBase);// 添加基地
  Navigation.registerComponent(Global.Screens.ChooseAddress.name, () => ChooseAddress);// 选择地址
  Navigation.registerComponent(Global.Screens.AddressAutoComplete.name, () => AddressAutoComplete);
  Navigation.registerComponent(Global.Screens.LandManage.name, () => LandManage); //地块管理
  Navigation.registerComponent(Global.Screens.EnterpriseList.name, () => EnterpriseList); // 企业列表
  Navigation.registerComponent(Global.Screens.IntUseRecord.name, () => IntUseRecord);// 投入品使用记录
  Navigation.registerComponent(Global.Screens.IntUseRecordAdd.name, () => IntUseRecordAdd);// 新增投入品使用
  Navigation.registerComponent(Global.Screens.IntUseRecordDetail.name, () => IntUseRecordDetail);// 投入品使用详情
  Navigation.registerComponent(Global.Screens.TestRecord.name, () => TestRecord); // 检测记录
  Navigation.registerComponent(Global.Screens.TestRecordAdd.name, () => TestRecordAdd); // 新增检测记录
  Navigation.registerComponent(Global.Screens.TestRecordDetail.name, () => TestRecordDetail); // 检测详情
  Navigation.registerComponent(Global.Screens.WorkRecord.name, () => WorkRecord); // 用工记录
  Navigation.registerComponent(Global.Screens.WorkRecordAdd.name, () => WorkRecordAdd); // 新增用工记录
  Navigation.registerComponent(Global.Screens.WorkRecordDetail.name, () => WorkRecordDetail); // 用工详情
  Navigation.registerComponent(Global.Screens.IntBuyRecord.name, () => IntBuyRecord);// 投入品购买记录
  Navigation.registerComponent(Global.Screens.IntBuyRecordAdd.name, () => IntBuyRecordAdd);// 新增投入品购买
  Navigation.registerComponent(Global.Screens.IntBuyRecordDetail.name, () => IntBuyRecordDetail);// 投入品购买详情
  Navigation.registerComponent(Global.Screens.IntBuyRecordBuy.name, () => IntBuyRecordBuy);// 选择投入品
  //标准园区
  Navigation.registerComponent(Global.Screens.GardenAdd.name, () => GardenAdd);// 新增标准园区
  Navigation.registerComponent(Global.Screens.GardenDetail.name, () => GardenDetail);// 标准园区详情
  Navigation.registerComponent(Global.Screens.Garden.name, () => Garden);// 标准园区
  Navigation.registerComponent(Global.Screens.GardenCrop.name, () => GardenCrop);// 作物种植
  Navigation.registerComponent(Global.Screens.GardenCropAdd.name, () => GardenCropAdd);// 新增作物种植
  Navigation.registerComponent(Global.Screens.GardenCropDetail.name, () => GardenCropDetail);// 作物种植详情
  //作物
  Navigation.registerComponent(Global.Screens.ProductRecoveryAdd.name, () => ProductRecoveryAdd);// 新增采摘
  Navigation.registerComponent(Global.Screens.ProductRecoveryDetail.name, () => ProductRecoveryDetail);// 采摘详情
  Navigation.registerComponent(Global.Screens.ProductRecovery.name, () => ProductRecovery);// 采摘
  Navigation.registerComponent(Global.Screens.ProductSale.name, () => ProductSale);// 销售
  Navigation.registerComponent(Global.Screens.ProductSaleAdd.name, () => ProductSaleAdd);// 新增销售
  Navigation.registerComponent(Global.Screens.ProductSaleDetail.name, () => ProductSaleDetail);// 销售详情
  //人员
  Navigation.registerComponent(Global.Screens.Staff.name, () => Staff);// 销售
  Navigation.registerComponent(Global.Screens.StaffAdd.name, () => StaffAdd);// 新增销售
  Navigation.registerComponent(Global.Screens.StaffDetail.name, () => StaffDetail);// 销售详情
}
