import { activity as claimBinanceKYC } from "./kyc/claim-binance-kyc-zkpass";
import { activity as claimBybitKYC } from "./kyc/claim-bybit-kyc-zkpass";
import { activity as claimGateKYC } from "./kyc/claim-gate-kyc-zkpass";
import { activity as claimKucoinKYC } from "./kyc/claim-kucoin-kyc-zkpass";
import { activity as claimMEXCKYC } from "./kyc/claim-mexc-kyc-zkpass";
import { activity as claimBinanceOwner } from "./ownership/claim-binance-owner-zkpass";
import { activity as claimBybitOwner } from "./ownership/claim-bybit-owner-zkpass";
import { activity as claimGateOwner } from "./ownership/claim-gate-owner-zkpass";
import { activity as claimKucoinOwner } from "./ownership/claim-kucoin-owner-zkpass";
import { activity as claimMEXCOwner } from "./ownership/claim-mexc-owner-zkpass";

export const activities = [
  // ownership
  claimBinanceOwner,
  claimBybitOwner,
  claimKucoinOwner,
  claimMEXCOwner,
  claimGateOwner,

  // kyc
  claimBinanceKYC,
  claimBybitKYC,
  claimKucoinKYC,
  claimMEXCKYC,
  claimGateKYC,
];
