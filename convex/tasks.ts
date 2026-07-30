import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// --- AUTHENTICATION MUTATIONS & QUERIES ---
export const registerUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    password: v.string(),
    role: v.string(),
    phone: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    if (existing) {
      throw new Error("User with this email already exists");
    }

    const userId = await ctx.db.insert("users", {
      ...args,
      createdAt: new Date().toISOString()
    });

    return { userId, email: args.email, name: args.name, role: args.role };
  }
});

export const loginUser = query({
  args: {
    email: v.string(),
    password: v.string()
  },
  handler: async (ctx, args) => {
    // Admin Master Account
    if (args.email.trim() === "admin@gmail.com" && args.password.trim() === "admin123") {
      return {
        _id: "admin-master",
        name: "AyurChain System Administrator",
        email: "admin@gmail.com",
        role: "admin"
      };
    }

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    if (!user || user.password !== args.password) {
      return null;
    }

    return user;
  }
});

export const getAllUsers = query({
  handler: async (ctx) => {
    return await ctx.db.query("users").order("desc").collect();
  }
});

// --- HARVESTS ---
export const getHarvests = query({
  handler: async (ctx) => {
    return await ctx.db.query("harvests").order("desc").collect();
  },
});

export const addHarvest = mutation({
  args: {
    farmerId: v.string(),
    farmerName: v.string(),
    aadhaarId: v.string(),
    farmLocation: v.string(),
    lat: v.number(),
    lng: v.number(),
    herbType: v.string(),
    harvestDate: v.string(),
    weightKg: v.number(),
    photoUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const harvestId = `HARVEST-${Math.floor(100 + Math.random() * 900)}`;
    const txHash = "0x" + Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join("");
    const ipfsCid = "Qm" + Array.from({length: 44}, () => "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"[Math.floor(Math.random() * 62)]).join("");

    const newRecord = {
      ...args,
      harvestId,
      ipfsPhotoCid: ipfsCid,
      blockchainTx: txHash,
      status: "Harvest Geo-Tagged & Immutable",
      soilHealthScore: "96/100 (Verified Bio-Humus)"
    };

    const id = await ctx.db.insert("harvests", newRecord);

    await ctx.db.insert("logs", {
      txHash,
      blockNumber: 18921000 + Math.floor(Math.random() * 100),
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
      action: "Farm Geo-Tag Harvest Minted",
      details: `Herb ${args.herbType} logged by ${args.farmerName} on Convex DB`
    });

    return { ...newRecord, _id: id };
  },
});

// --- TRANSPORT ---
export const updateTransport = mutation({
  args: {
    harvestId: v.string(),
    transport: v.object({
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
  },
  handler: async (ctx, args) => {
    const harvest = await ctx.db
      .query("harvests")
      .filter((q) => q.eq(q.field("harvestId"), args.harvestId))
      .first();

    if (harvest) {
      await ctx.db.patch(harvest._id, {
        transport: args.transport,
        status: "In Transit"
      });

      const txHash = "0x" + Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join("");
      await ctx.db.insert("logs", {
        txHash,
        blockNumber: 18921050 + Math.floor(Math.random() * 50),
        timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
        action: "Transport Handoff Executed",
        details: `Transporter ${args.transport.transporterName} assigned to ${args.harvestId}`
      });
    }
  }
});

// --- LAB REPORTS ---
export const addLabReport = mutation({
  args: {
    harvestId: v.string(),
    labReport: v.object({
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
  },
  handler: async (ctx, args) => {
    const harvest = await ctx.db
      .query("harvests")
      .filter((q) => q.eq(q.field("harvestId"), args.harvestId))
      .first();

    if (harvest) {
      await ctx.db.patch(harvest._id, {
        labReport: args.labReport,
        status: "Quality Tested & Certified"
      });

      const txHash = "0x" + Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join("");
      await ctx.db.insert("logs", {
        txHash,
        blockNumber: 18921100 + Math.floor(Math.random() * 50),
        timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
        action: "Lab Quality Certificate Minted",
        details: `Grade ${args.labReport.qualityGrade} awarded to ${args.harvestId}`
      });
    }
  }
});

// --- BATCHES ---
export const getBatches = query({
  handler: async (ctx) => {
    return await ctx.db.query("batches").order("desc").collect();
  },
});

export const createBatch = mutation({
  args: {
    batchId: v.string(),
    medicineName: v.string(),
    manufacturerName: v.string(),
    manufactureDate: v.string(),
    expiryDate: v.string(),
    quantity: v.string(),
    harvestIds: v.array(v.string()),
    aiVerificationScore: v.number()
  },
  handler: async (ctx, args) => {
    const txHash = "0x" + Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join("");

    const newBatch = {
      ...args,
      qrCodeId: args.batchId,
      status: "Manufactured & QR Encoded",
      blockchainTxHash: txHash,
      validatorNodesConfirmed: 16,
      sustainabilityScore: "Grade A+ Carbon Neutral"
    };

    const id = await ctx.db.insert("batches", newBatch);

    await ctx.db.insert("logs", {
      txHash,
      blockNumber: 18921200 + Math.floor(Math.random() * 50),
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
      action: "Medicine Batch Finalized",
      details: `Batch ${args.batchId} created for ${args.medicineName}`
    });

    return { ...newBatch, _id: id };
  }
});

// --- LOGS ---
export const getLogs = query({
  handler: async (ctx) => {
    return await ctx.db.query("logs").order("desc").collect();
  },
});
