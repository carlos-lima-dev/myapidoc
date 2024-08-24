import {Express} from "express";
import swaggerJSDoc, {Options} from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

export default function setupSwagger(app: Express) {
  const options: Options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "API Documentation - Store",
        version: "1.0.0",
        description: "This is the API documentation for the Store application.",
      },
      components: {
        schemas: {
          User: {
            type: "object",
            properties: {
              username: {type: "string"},
              email: {type: "string", format: "email"},
              password: {type: "string", format: "password"},
              avatar: {type: "string"},
              role: {type: "string", enum: ["user", "admin"]},
              isVerified: {type: "boolean"},
              emailVerificationToken: {type: "string"},
              emailVerificationExpires: {type: "string", format: "date-time"},
            },
            required: ["username", "email", "password", "role"],
          },
          Product: {
            type: "object",
            properties: {
              sku: {type: "string"},
              title: {type: "string"},
              price: {type: "number"},
              description: {type: "string"},
              category: {type: "string"},
              subCategory: {type: "string"},
              brand: {type: "string"},
              images: {type: "array", items: {type: "string"}},
              thumbnail: {type: "string"},
              stock: {type: "number"},
              weight: {type: "number"},
              dimensions: {
                type: "object",
                properties: {
                  length: {type: "number"},
                  width: {type: "number"},
                  height: {type: "number"},
                },
              },
              colorOptions: {type: "array", items: {type: "string"}},
              sizeOptions: {type: "array", items: {type: "string"}},
              tags: {type: "array", items: {type: "string"}},
              rating: {
                type: "object",
                properties: {
                  rate: {type: "number"},
                  count: {type: "number"},
                },
              },
              discount: {
                type: "object",
                properties: {
                  percentage: {type: "number"},
                  validUntil: {type: "string", format: "date-time"},
                },
              },
              reviews: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    userId: {type: "number"},
                    comment: {type: "string"},
                    rating: {type: "number"},
                    date: {type: "string", format: "date-time"},
                  },
                },
              },
              createdAt: {type: "string", format: "date-time"},
              updatedAt: {type: "string", format: "date-time"},
              isFeatured: {type: "boolean"},
              isNewArrival: {type: "boolean"},
              relatedProducts: {
                type: "array",
                items: {type: "string", format: "uuid"},
              },
              shippingDetails: {
                type: "object",
                properties: {
                  isFreeShipping: {type: "boolean"},
                  shippingCost: {type: "number"},
                  estimatedDelivery: {type: "string", format: "date-time"},
                },
              },
            },
            required: [
              "sku",
              "title",
              "price",
              "description",
              "category",
              "stock",
            ],
          },
        },
      },
    },
    apis: ["./src/routes/**/*.ts"], // Ajuste o caminho conforme necessário
  };

  const specs = swaggerJSDoc(options);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
}
