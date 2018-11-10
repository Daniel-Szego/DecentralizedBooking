import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.booking.model{
   export abstract class BookableObject extends Asset {
      bookableId: string;
      date: Date;
   }
   export enum RoomType {
      SIMPLE,
      DELUXE,
      KING,
   }
   export enum RoomStatus {
      FREE,
      RESEREVED,
   }
   export class Room extends BookableObject {
      numberOfPeople: number;
      numberOfBeds: number;
      roomType: RoomType;
      roomStatus: RoomStatus;
      hotel: Hotel;
      endUser: EndUser;
   }
   export class Address {
      country: string;
      city: string;
      street: string;
      hauseNr: number;
   }
   export abstract class BookableObjectHolder extends Participant {
      holderId: string;
   }
   export class Hotel extends BookableObjectHolder {
      hotelName: string;
      address: Address;
   }
   export class EndUser extends Participant {
      userId: string;
      UserName: string;
   }
   export class InitTestData extends Transaction {
   }
   export class ClearData extends Transaction {
   }
   export class IssueHotelRoom extends Transaction {
      hotel: Hotel;
      numberOfPeople: number;
      numberOfBeds: number;
      roomType: RoomType;
      roomStatus: RoomStatus;
      dateString: string;
   }
   export class ReserveRoom extends Transaction {
      room: Room;
      me: EndUser;
   }
   export class TransferRoom extends Transaction {
      room: Room;
      to: EndUser;
   }
   export class ObjectIssued extends Event {
      object: BookableObject;
      objectHolder: BookableObjectHolder;
   }
   export class ObjectReservered extends Event {
      object: BookableObject;
   }
   export class ObjectTransferred extends Event {
      object: BookableObject;
      to: EndUser;
   }
// }
