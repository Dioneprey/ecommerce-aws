#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ProductsAppStack } from '../lib/productsApp-stack';
import { ECommerceApiStack } from '../lib/ecommerceApi-stack';

const app = new cdk.App();

const environment: cdk.Environment = {
  account: process.env.AWS_ACCOUNT,
  region: process.env.AWS_REGION,
}

const tags = {
  cost: "ECommerce",
  team: "DioneDEV"
}

const productsAppStack = new ProductsAppStack(app, "ProductsApp", {
  tags,
  env: environment
})

const eCommerceApiStack = new ECommerceApiStack(app, "ECommerceApi", {
  productsFetchHandler: productsAppStack.productsFetchHandler,
  tags,
  env: environment
})
eCommerceApiStack.addDependency(productsAppStack)