// Extended AyurChain Store & Blockchain Engine
// Features: Dynamic Temperature & GPS Telemetry Simulator, Multi-Node Validators, Automated IoT Quality Alerts, Export Passports

export const INITIAL_ANALYTICS = {
  totalFarmers: 142,
  totalHarvestKg: 18450,
  activeLogisticsUnits: 38,
  verifiedConsumerScans: 12840,
  authenticityRate: "99.8%",
  co2SavedKg: "4,200 kg Organic Offset"
};

export const INITIAL_BATCHES = [
  {
    batchId: "AYUR-2026-ASH88",
    medicineName: "Divya Ashwagandha Rasayana (500mg)",
    manufacturerName: "Patanjali Herbals & Research Labs",
    manufactureDate: "2026-07-28",
    expiryDate: "2028-07-28",
    quantity: "5,000 Bottles",
    qrCodeId: "AYUR-2026-ASH88",
    status: "Verified & Distributed",
    harvestIds: ["HARVEST-101", "HARVEST-102"],
    aiVerificationScore: 98.4,
    blockchainTxHash: "0x8f2a91e4b850d12c6fa71309e4a8f9c1b3d7e5f9a0c2e4f6b8a1c3d5e7f9a0b2",
    validatorNodesConfirmed: 12,
    sustainabilityScore: "Grade A+ Carbon Neutral"
  },
  {
    batchId: "AYUR-2026-TUL42",
    medicineName: "Organic Tulsi & Giloy Immunity Booster",
    manufacturerName: "Himalaya Wellness Herbal Ltd.",
    manufactureDate: "2026-07-29",
    expiryDate: "2028-01-29",
    quantity: "3,200 Packs",
    qrCodeId: "AYUR-2026-TUL42",
    status: "Quality Approved",
    harvestIds: ["HARVEST-103"],
    aiVerificationScore: 96.8,
    blockchainTxHash: "0x4b7e1a3c9f2d5e8a0b6c4d2e0f8a6c4b2e0f8a6c4b2e0f8a6c4b2e0f8a6c4b2e",
    validatorNodesConfirmed: 10,
    sustainabilityScore: "Grade A Zero Waste"
  }
];

export const INITIAL_HARVESTS = [
  {
    harvestId: "HARVEST-101",
    farmerId: "FAR-8849",
    farmerName: "Rajesh Kumar Sharma",
    farmLocation: "Wayanad Herbal Valley, Kerala",
    lat: 11.6854,
    lng: 76.1320,
    aadhaarId: "XXXX-XXXX-8921",
    herbType: "Ashwagandha (Withania somnifera)",
    harvestDate: "2026-07-20",
    weightKg: 150,
    ipfsPhotoCid: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
    photoUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    blockchainTx: "0x7a8b9c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b",
    status: "Processed into Medicine",
    soilHealthScore: "94/100 (Organic Bio-humus)",

    transport: {
      transporterName: "Kerala Green Cold Chain Logistics",
      driverName: "Suresh Menon",
      vehicleNo: "KL-12-AE-4091",
      dispatchDate: "2026-07-21 08:30 AM",
      arrivalDate: "2026-07-22 04:15 PM",
      destination: "Central Ayurvedic Processing Hub, Mysuru",
      tempMaintained: "22°C - 24°C",
      humidity: "48%",
      iotAlerts: "Zero Temperature Spikes (Safe Transit)",
      status: "Delivered to Lab"
    },

    labReport: {
      labName: "Ayush Certified Central Testing Facility",
      testDate: "2026-07-24",
      activeAlkaloidsPercent: 4.8,
      pesticideResidue: "ND (Not Detected)",
      heavyMetals: "Pass (Below 0.01 ppm)",
      moistureContent: "6.2%",
      qualityGrade: "Grade A+ (Export Standard)",
      ipfsCertificateCid: "QmbWqxBEKC3P8tYkC21mQX9g8f3hK8kL3zXyM2vW1N4bV5",
      testedBy: "Dr. Ananya Rao (Senior Pharmacognosist)"
    }
  },
  {
    harvestId: "HARVEST-102",
    farmerId: "FAR-9021",
    farmerName: "Lakshmi Devi",
    farmLocation: "Shivamogga Medicinal Farms, Karnataka",
    lat: 13.9299,
    lng: 75.5681,
    aadhaarId: "XXXX-XXXX-4412",
    herbType: "Ashwagandha Organic Roots",
    harvestDate: "2026-07-21",
    weightKg: 200,
    ipfsPhotoCid: "QmZ3yX8W2kF1mQ9g8f3hK8kL3zXyM2vW1N4bV5a6c7d8e9",
    photoUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80",
    blockchainTx: "0x1f2e3d4c5b6a7f8e9d0c1b2a3f4e5d6c7b8a9f0e1d2c3b4a5f6e7d8c9b0a1f2e",
    status: "Processed into Medicine",
    soilHealthScore: "96/100 (Natural Compost)",

    transport: {
      transporterName: "Sahyadri Cold Chain Express",
      driverName: "Ramesh Gowda",
      vehicleNo: "KA-14-C-8820",
      dispatchDate: "2026-07-22 09:00 AM",
      arrivalDate: "2026-07-23 02:00 PM",
      destination: "Central Ayurvedic Processing Hub, Mysuru",
      tempMaintained: "21°C - 23°C",
      humidity: "50%",
      iotAlerts: "Zero Temperature Spikes",
      status: "Delivered to Lab"
    },

    labReport: {
      labName: "Ayush Certified Central Testing Facility",
      testDate: "2026-07-25",
      activeAlkaloidsPercent: 4.6,
      pesticideResidue: "ND (Not Detected)",
      heavyMetals: "Pass (Below 0.01 ppm)",
      moistureContent: "5.8%",
      qualityGrade: "Grade A+ (Export Standard)",
      ipfsCertificateCid: "QmR4tY7uI9oP1aS2dF3gH4jK5lL6zX7c8v9b0nM1v2W3",
      testedBy: "Dr. K. V. Sharma"
    }
  },
  {
    harvestId: "HARVEST-103",
    farmerId: "FAR-3310",
    farmerName: "Gurpreet Singh",
    farmLocation: "Himalayan Organic Herb Belt, Himachal Pradesh",
    lat: 31.1048,
    lng: 77.1734,
    aadhaarId: "XXXX-XXXX-1109",
    herbType: "Krishna Tulsi & Giloy Stems",
    harvestDate: "2026-07-23",
    weightKg: 95,
    ipfsPhotoCid: "QmY7uI9oP1aS2dF3gH4jK5lL6zX7c8v9b0nM1v2W3x4y5z",
    photoUrl: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",
    blockchainTx: "0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d",
    status: "Processed into Medicine",
    soilHealthScore: "98/100 (Glacial Mineral Water Fed)",

    transport: {
      transporterName: "Himalayan Express Cold Transporters",
      driverName: "Harjeet Singh",
      vehicleNo: "HP-01-B-9912",
      dispatchDate: "2026-07-24 07:00 AM",
      arrivalDate: "2026-07-25 06:30 PM",
      destination: "Himalaya Wellness Processing Hub, Haridwar",
      tempMaintained: "18°C - 22°C",
      humidity: "42%",
      iotAlerts: "Zero Spikes",
      status: "Delivered to Lab"
    },

    labReport: {
      labName: "Haridwar Quality Assurance Bio Lab",
      testDate: "2026-07-27",
      activeAlkaloidsPercent: 5.2,
      pesticideResidue: "ND (Not Detected)",
      heavyMetals: "Pass (Zero Toxicity)",
      moistureContent: "7.0%",
      qualityGrade: "Grade A+ (Pure Organic)",
      ipfsCertificateCid: "QmP9oI8uY7tR6eW5qA4sD3fG2hJ1kL0zX9c8v7b6nM5",
      testedBy: "Dr. Meenakshi Verma"
    }
  }
];

class AyurChainStore {
  constructor() {
    this.harvests = [...INITIAL_HARVESTS];
    this.batches = [...INITIAL_BATCHES];
    this.blockchainLogs = [
      {
        txHash: "0x8f2a91e4b850d12c6fa71309e4a8f9c1b3d7e5f9a0c2e4f6b8a1c3d5e7f9a0b2",
        blockNumber: 18920412,
        timestamp: "2026-07-28 14:22:10",
        action: "Batch Minted",
        details: "Batch AYUR-2026-ASH88 linked with HARVEST-101, HARVEST-102"
      },
      {
        txHash: "0x7a8b9c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b",
        blockNumber: 18919010,
        timestamp: "2026-07-20 10:15:00",
        action: "Farm Collection Registered",
        details: "Farmer Rajesh Kumar Sharma logged Ashwagandha at Wayanad, Kerala"
      }
    ];
  }

  getHarvests() {
    return this.harvests;
  }

  getBatches() {
    return this.batches;
  }

  getLogs() {
    return this.blockchainLogs;
  }

  addHarvest(newHarvest) {
    const txHash = "0x" + Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join("");
    const ipfsCid = "Qm" + Array.from({length: 44}, () => "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"[Math.floor(Math.random() * 62)]).join("");
    
    const harvestRecord = {
      ...newHarvest,
      harvestId: `HARVEST-${Math.floor(100 + Math.random() * 900)}`,
      ipfsPhotoCid: ipfsCid,
      blockchainTx: txHash,
      status: "Harvest Geo-Tagged & Immutable",
      soilHealthScore: "95/100 (Verified Organic)",
      transport: null,
      labReport: null
    };

    this.harvests.unshift(harvestRecord);
    this.blockchainLogs.unshift({
      txHash: txHash,
      blockNumber: 18921000 + this.blockchainLogs.length,
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
      action: "Farm Geo-Tag Harvest Minted",
      details: `Herb ${harvestRecord.herbType} logged by ${harvestRecord.farmerName}`
    });

    return harvestRecord;
  }

  updateTransport(harvestId, transportData) {
    const harvest = this.harvests.find(h => h.harvestId === harvestId);
    if (!harvest) return null;

    harvest.transport = {
      ...transportData,
      status: "In Transit / Delivered to Lab"
    };
    harvest.status = "In Transit";

    const txHash = "0x" + Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join("");
    this.blockchainLogs.unshift({
      txHash: txHash,
      blockNumber: 18921050 + this.blockchainLogs.length,
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
      action: "Transport Handoff Executed",
      details: `Transporter ${transportData.transporterName} assigned to ${harvestId}`
    });

    return harvest;
  }

  addLabReport(harvestId, labData) {
    const harvest = this.harvests.find(h => h.harvestId === harvestId);
    if (!harvest) return null;

    const certCid = "QmLab" + Array.from({length: 40}, () => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join("");
    
    harvest.labReport = {
      ...labData,
      ipfsCertificateCid: certCid
    };
    harvest.status = "Quality Tested & Certified";

    const txHash = "0x" + Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join("");
    this.blockchainLogs.unshift({
      txHash: txHash,
      blockNumber: 18921100 + this.blockchainLogs.length,
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
      action: "Lab Quality Certificate Minted",
      details: `Grade ${labData.qualityGrade} awarded to ${harvestId} by ${labData.labName}`
    });

    return harvest;
  }

  createMedicineBatch(batchData) {
    const txHash = "0x" + Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join("");
    
    const newBatch = {
      ...batchData,
      qrCodeId: batchData.batchId,
      status: "Manufactured & QR Encoded",
      blockchainTxHash: txHash,
      validatorNodesConfirmed: 16,
      sustainabilityScore: "Grade A+ Certified Organic"
    };

    batchData.harvestIds.forEach(id => {
      const harvest = this.harvests.find(h => h.harvestId === id);
      if (harvest) harvest.status = "Processed into Medicine Batch";
    });

    this.batches.unshift(newBatch);
    this.blockchainLogs.unshift({
      txHash: txHash,
      blockNumber: 18921200 + this.blockchainLogs.length,
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
      action: "Medicine Batch Finalized & Sealed",
      details: `Batch ${newBatch.batchId} created for ${newBatch.medicineName}`
    });

    return newBatch;
  }
}

export const ayurStore = new AyurChainStore();
