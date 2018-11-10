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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { RoomComponent } from './Room/Room.component';

import { HotelComponent } from './Hotel/Hotel.component';
import { EndUserComponent } from './EndUser/EndUser.component';

import { InitTestDataComponent } from './InitTestData/InitTestData.component';
import { ClearDataComponent } from './ClearData/ClearData.component';
import { IssueHotelRoomComponent } from './IssueHotelRoom/IssueHotelRoom.component';
import { ReserveRoomComponent } from './ReserveRoom/ReserveRoom.component';
import { TransferRoomComponent } from './TransferRoom/TransferRoom.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Room', component: RoomComponent },
  { path: 'Hotel', component: HotelComponent },
  { path: 'EndUser', component: EndUserComponent },
  { path: 'InitTestData', component: InitTestDataComponent },
  { path: 'ClearData', component: ClearDataComponent },
  { path: 'IssueHotelRoom', component: IssueHotelRoomComponent },
  { path: 'ReserveRoom', component: ReserveRoomComponent },
  { path: 'TransferRoom', component: TransferRoomComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
