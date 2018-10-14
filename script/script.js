/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* global getAssetRegistry getFactory emit */

const namespace = "org.booking.model"; 

/**
 * Initializing test data.
 * @param {org.booking.model.InitTestData} param The sample transaction instance.
 * @transaction
 */
async function InitTestDataTransaction(param) {  
      console.log('init test data');

    console.log('Creating a Hotel');  
    const factory = getFactory(); 
	
  	// adding hotel 1
    const hotelReg = await getParticipantRegistry(namespace + '.Hotel');   
    const hotel = await factory.newResource(namespace, 'Hotel', "1");
    hotel.hotelName = "Hotel 1";
    const newAddress = await factory.newConcept(namespace, 'Address');
	newAddress.country = "Bejing";
	newAddress.city = "China";
	newAddress.street = "Xia Mo Street";
    newAddress.hauseNr = 16;
  	hotel.address = newAddress;
  
    await hotelReg.add(hotel);       

  	// adding hotel 1
    console.log('Hotel 2');  

    const hotel2 = await factory.newResource(namespace, 'Hotel', "2");
    hotel2.hotelName = "Hotel 2";
    const newAddress2 = await factory.newConcept(namespace, 'Address');
	newAddress2.country = "Hong Kong";
	newAddress2.city = "China";
	newAddress2.street = "Mua Mo Street";
    newAddress2.hauseNr = 22;
  	hotel2.address = newAddress2;
  
    await hotelReg.add(hotel2);     
  
  	// adding endUser 1
    const endUserReg = await getParticipantRegistry(namespace + '.EndUser');   
    const endUser = await factory.newResource(namespace, 'EndUser', "1");
    endUser.UserName = "John Rambo";
  
    await endUserReg.add(endUser);       

    // adding endUser 2
    const endUser2 = await factory.newResource(namespace, 'EndUser', "2");
    endUser2.UserName = "John Rambo";
  
    await endUserReg.add(endUser2);       

  
}

/**
 * Clearing test data.
 * @param {org.booking.model.ClearData} param The sample transaction instance.
 * @transaction
 */
async function ClearDataTransaction(param) {  
      console.log('clearing test data');

    // deleting assets
    const RoomReg = await getAssetRegistry(namespace + '.Room'); 
    let Rooms = await RoomReg.getAll();
    await RoomReg.removeAll(Rooms);
  
  	// deleting participants
    const hotelReg = await getParticipantRegistry(namespace + '.Hotel');
    let hotels = await hotelReg.getAll();
    await hotelReg.removeAll(hotels);
    
    const endUserReg = await getParticipantRegistry(namespace + '.EndUser');
    let endUsers = await endUserReg.getAll();
    await endUserReg.removeAll(endUsers);
}

/**
 * Issue hotel room.
 * @param {org.booking.model.IssueHotelRoom} param The sample transaction instance.
 * @transaction
 */
async function IssueHotelRoomTransaction(param) {  
}

/**
 * Reserve hotel room.
 * @param {org.booking.model.ReserveRoom} param The sample transaction instance.
 * @transaction
 */
async function ReserveRoomTransaction(param) {  
}

/**
 * Transfer hotel room.
 * @param {org.booking.model.TransferRoom} param The sample transaction instance.
 * @transaction
 */
async function TransferRoomTransaction(param) {  
}

