import crypto from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';
import payuConfig from '../config/payu.config';

export interface PaymentRequest {
  amount: number;
  productInfo: string;
  firstName: string;
  email: string;
  phone: string;
  address?: string;
  orderId: string;
}

export class PayUService {
  private generateHash(params: Record<string, string>): string {
    const { merchantKey, merchantSalt } = payuConfig;
    const hashString = `${merchantKey}|${params.txnid}|${params.amount}|${params.productinfo}|${params.firstname}|${params.email}|${params.udf1}||||||||||${merchantSalt}`;
    console.log('Hash string for request:', hashString);
    return crypto.SHA512(hashString).toString();
  }

  public async createPaymentRequest(payment: PaymentRequest) {
    const txnId = uuidv4();
    const params: Record<string, string> = {
      key: payuConfig.merchantKey,
      txnid: txnId,
      amount: payment.amount.toString(),
      productinfo: payment.productInfo,
      firstname: payment.firstName,
      email: payment.email,
      phone: payment.phone,
      surl: payuConfig.successUrl,
      furl: payuConfig.failureUrl,
      udf1: payment.orderId,
    };

    const hash = this.generateHash(params);
    return {
      ...params,
      hash,
      action: payuConfig.payuBaseUrl,
    };
  }

  public verifyPayment(params: Record<string, string>): boolean {
    console.log('Verifying payment with params:', params);
    const { merchantKey, merchantSalt } = payuConfig;
    const receivedHash = params.hash;

    // For response verification, the string sequence is:
    // salt|status|udf10|udf9|udf8|udf7|udf6|udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key
    const hashSequence = [
      merchantSalt,          // salt
      params.status,         // status
      params.udf10 || '',    // udf10
      params.udf9 || '',     // udf9
      params.udf8 || '',     // udf8
      params.udf7 || '',     // udf7
      params.udf6 || '',     // udf6
      params.udf5 || '',     // udf5
      params.udf4 || '',     // udf4
      params.udf3 || '',     // udf3
      params.udf2 || '',     // udf2
      params.udf1 || '',     // udf1
      params.email,          // email
      params.firstname,      // firstname
      params.productinfo,    // productinfo
      params.amount,         // amount
      params.txnid,          // txnid
      merchantKey           // key
    ];

    const hashString = hashSequence.join('|');
    console.log('Verification hash string:', hashString);
    const calculatedHash = crypto.SHA512(hashString).toString();
    console.log('Calculated hash:', calculatedHash);
    console.log('Received hash:', receivedHash);

    const isValid = calculatedHash === receivedHash;
    console.log('Hash verification result:', isValid);

    return isValid;
  }
} 