import React, { useEffect, useState } from 'react'
import DashBoardLayout from './DashBoardLayout'
import DashboardSectionTitle from '../../../Component/Util/Title/DashboardSectionTitle'
import FullBox from '../../../Component/Util/Box/FullBox'
import AdressItem from '../../../Component/Other/AdressItem'
import AddressManageModel from '../../../Component/OverLay/AddressManageModel'
import { deleteAddress, getUserAddress } from '../../../API/api_request'
import EmptyScreen from '../../../Component/Util/Box/EmptyScreen'

function ManageAddress() {

  let [addressList, addressListUpdate] = useState([]);


  async function fetchUserAddress() {
    try {
      const data = await getUserAddress();
      addressListUpdate(data.data?.address);
    } catch (err) {
      addressListUpdate([]);
    }
  }

  useEffect(() => {
    fetchUserAddress()
  }, [])


  function onDeleteAddress(id) {
    let confirm = window.confirm("Are you sure want to delete this address")
    if (confirm) {
      deleteAddress(id).then((data) => {
        fetchUserAddress()
      }).catch((err) => {
        console.log("error1");
      })
    }
  }


  return (
    <DashBoardLayout>
      <AddressManageModel state={addressListUpdate}></AddressManageModel>
      <DashboardSectionTitle title={"Manage Address"} icon={"uil-location-point"} ></DashboardSectionTitle>
      <FullBox withoutFooter={true} title={<h4>My Address</h4>}>
        <a href="#" class="add-address hover-btn mt-0" data-toggle="modal" data-target="#address_model">Add New Address</a>
        {
          addressList?.length > 0 ? (
            addressList.map((addressItem) => {
              return <AdressItem address_data={addressItem} onUpdate={fetchUserAddress} address_id={addressItem._id} is_primary={addressItem.is_primary} address={addressItem?.address} type={addressItem?.type} onDelete={() => {
                onDeleteAddress(addressItem._id)
              }} ></AdressItem>
            })
          ) : <EmptyScreen bgColor={"white"} content={"Add your address before exploring cart"} title={"You don't have address"}></EmptyScreen>
        }
         

      </FullBox>
    </DashBoardLayout>
  )
}

export default ManageAddress
