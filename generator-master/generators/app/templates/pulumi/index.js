"use strict";
const aws = require("@pulumi/aws");
const pulumi = require("@pulumi/pulumi");

let size = "t2.micro";     
let ami = pulumi.output(aws.getAmi({
    filters: [{
      name: "name",
      values: ["amzn-ami-hvm-*"],
    }],
    owners: ["137112412989"], 
    mostRecent: true,
}));

let group = new aws.ec2.SecurityGroup("webserver-secgrp", {
    ingress: [
        { protocol: "tcp", fromPort: 80, toPort: 80, cidrBlocks: ["0.0.0.0/0"] },
    ],
});

let server = new aws.ec2.Instance("webserver-www", {
    instanceType: size,
    vpcSecurityGroupIds: [ group.id ], 
    ami: ami.id,
});

exports.publicIp = server.publicIp;
exports.publicHostName = server.publicDns;
