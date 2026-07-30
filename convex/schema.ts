import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  harvests: defineTable({
    harvestId: v.string(),
    farmerId: v.string(),
    farmerName: v.string(),
    aadhaarId: v.string(),
    farmLocation: v.string(),
    lat: v.number(),
    lng: v.number(),
    herbType: v.string(),
    harvestDate: v.string(),
    weightKg: v.number(),
    ipfsPhotoCid: v.string(),
    photoUrl: v.string(),
    blockchainTx: v.string(),
    status: v.string(),
    soilHealthScore: v.optional(v.string()),
    transport: v.optional(
      v.object({
        transporterName: v.string(),
        driverName: v.string(),
        vehicleNo: v.string(),
        dispatchDate: v.string(),
        arrivalDate: v.string(),
        destination: v.string(),
        tempMaintained: v.string(),
        humidity: v.optional(v.string()),
        iotAlerts: v.optional(v.string()),
        status: v.string()
      })
    ),
    labReport: v.optional(
      v.object({
        labName: v.string(),
        testDate: v.string(),
        activeAlkaloidsPercent: v.number(),
        pesticideResidue: v.string(),
        heavyMetals: v.string(),
        moistureContent: v.string(),
        qualityGrade: v.string(),
        ipfsCertificateCid: v.string(),
        testedBy: v.string()
      })
    )
  }),

  batches: defineTable({
    batchId: v.string(),
    medicineName: v.string(),
    manufacturerName: v.string(),
    manufactureDate: v.string(),
    expiryDate: v.string(),
    quantity: v.string(),
    qrCodeId: v.string(),
    status: v.string(),
    harvestIds: v.array(v.string()),
    aiVerificationScore: v.number(),
    blockchainTxHash: v.string(),
    validatorNodesConfirmed: v.optional(v.number()),
    sustainabilityScore: v.optional(v.string())
  }),

  logs: defineTable({
    txHash: v.string(),
    blockNumber: v.number(),
    timestamp: v.string(),
    action: v.string(),
    details: v.string()
  }),

  analytics: defineTable({
    totalVisits: v.number(),
    totalConsumerScans: v.number(),
    activeFarmers: v.number(),
    totalHarvestKg: v.number()
  })
});
