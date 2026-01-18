import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {

  async redirects() {
    return [
      {
        source: "/companies/01ee71b8-53d6-4415-9d88-9c2423df8691",
        destination: "/companies/google/leetcode-interview-questions",
        permanent: true,
      },
      {
        source: "/companies/019de64b-f221-40e5-bf6c-47581b945336",
        destination: "/companies/capgemini/leetcode-interview-questions",
        permanent: true,
      },
      {
        source: "/companies/18eca962-ecf7-46a6-b9b1-a2e00963bbaf",
        destination: "/companies/adobe/leetcode-interview-questions",
        permanent: true,
      },
      {
        source: "/companies/208952df-69f9-46dc-8d92-7716d355af29",
        destination: "/companies/netflix/leetcode-interview-questions",
        permanent: true,
      },
      {
        source: "/companies/2624f4fa-dcac-403c-b008-48b5fb150b44",
        destination: "/companies/cisco/leetcode-interview-questions",
        permanent: true,
      },
      {
        source: "/companies/2cd9d6bf-39fd-4402-a987-0dffde549612",
        destination: "/companies/cognizant/leetcode-interview-questions",
        permanent: true,
      },
      {
        source: "/companies/3aa46666-1793-48df-bb29-08e8af6f8b66",
        destination: "/companies/jp-morgan/leetcode-interview-questions",
        permanent: true,
      },
      {
        source: "/companies/50e04f19-e2de-41f2-8439-44214e194025",
        destination: "/companies/cars24/leetcode-interview-questions",
        permanent: true,
      },
      {
        source: "/companies/6e37d3d1-b8d6-49c7-a75e-17c5ed1fb027",
        destination: "/companies/goldman-sachs/leetcode-interview-questions",
        permanent: true,
      },
      {
        source: "/companies/70db1fe5-8b45-4443-b0bf-b4a0829806c3",
        destination: "/companies/infosys/leetcode-interview-questions",
        permanent: true,
      },
      {
        source: "/companies/734ee652-a58a-48ab-91da-dcd0d99d9166",
        destination: "/companies/tech-mahindra/leetcode-interview-questions",
        permanent: true,
      },
      {
        source: "/companies/748b53bd-9576-4e61-9457-a1de8011b87c",
        destination: "/companies/meta/leetcode-interview-questions",
        permanent: true,
      },
      {
        source: "/companies/7bc22832-d657-424a-8019-0c87d3574d52",
        destination: "/companies/hcl-technologies/leetcode-interview-questions",
        permanent: true,
      },
      {
        source: "/companies/839efa4c-49a9-4726-80b6-cb6f6d983dd5",
        destination: "/companies/amazon/leetcode-interview-questions",
        permanent: true,
      },
      {
        source: "/companies/84ef901d-8b56-441a-9859-157221c4fbd0",
        destination: "/companies/microsoft/leetcode-interview-questions",
        permanent: true,
      },
      {
        source: "/companies/885de31c-0182-489f-853c-d55b7bc3b548",
        destination: "/companies/atlassian/leetcode-interview-questions",
        permanent: true,
      },
      {
        source: "/companies/8908f25e-c3c1-4a53-a6c1-f48989142c6f",
        destination: "/companies/uber/leetcode-interview-questions",
        permanent: true,
      },
      {
        source: "/companies/8993a9e4-f2a9-4398-b32b-597641467f59",
        destination: "/companies/samsung/leetcode-interview-questions",
        permanent: true,
      },
      {
        source: "/companies/8f3be5ba-089f-4ec3-be9f-566f69da4da1",
        destination: "/companies/tcs/leetcode-interview-questions",
        permanent: true,
      },
      {
        source: "/companies/a203ee0d-e92b-476a-8ab7-30fecd3dc556",
        destination: "/companies/apple/leetcode-interview-questions",
        permanent: true,
      },
      {
        source: "/companies/aa70cccc-8a48-4ef7-ba9c-f60b5f23636b",
        destination: "/companies/intel/leetcode-interview-questions",
        permanent: true,
      },
      {
        source: "/companies/be3e6bac-ec1f-45d8-bb6f-d9d31e841d0a",
        destination: "/companies/nvidia/leetcode-interview-questions",
        permanent: true,
      },
      {
        source: "/companies/d6bef37b-445d-4805-90ef-8d0f4bf1f7f1",
        destination: "/companies/wipro/leetcode-interview-questions",
        permanent: true,
      },
      {
        source: "/companies/e2ba08c2-992d-4539-ab8b-187f2e3e9ed3",
        destination: "/companies/ibm/leetcode-interview-questions",
        permanent: true,
      },
      {
        source: "/companies/f28f2c5d-75f2-4803-9aca-7f9d3471551b",
        destination: "/companies/oracle/leetcode-interview-questions",
        permanent: true,
      },
      {
        source: "/companies/f762d376-ca91-48a9-a89e-7f3dd99ec2e2",
        destination: "/companies/deloitte/leetcode-interview-questions",
        permanent: true,
      },
      {
        source: "/companies/fd5a7829-61a7-45ca-97ce-e04f18a04340",
        destination: "/companies/paypal/leetcode-interview-questions",
        permanent: true,
      },
      {
        source: "/companies/ff787fb2-aebf-4f45-9486-3588a7ef2ba5",
        destination: "/companies/amd/leetcode-interview-questions",
        permanent: true,
      },
      {
        source: "/companies/ff82eb40-bfb5-43da-af6f-f22d0be55874",
        destination: "/companies/flipkart/leetcode-interview-questions",
        permanent: true,
      },

     
    ];
  },


  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "veerpreps.s3.ap-south-1.amazonaws.com",
        pathname: "/**",
      },
      
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.gstatic.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "logopoppin.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "imgs.search.brave.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "msblogs.thesourcemediaassets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.paypalobjects.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "logo.clearbit.com",
        pathname: "/**",
      },
    ],
   
  },

  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
};

export default withMDX(nextConfig);
