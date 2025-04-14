const Project = require('../Model/project.model');

const createProject = async (req, res) => {
  try {
    const userId = req.user;

    const {
      area,
      bricks,
      cement,
      flooring,
      roofing,
      paint,
      laborRegion,
      contractorType,
      waterTank,
      rainHarvest,
      electrical,
      plumbing,
    } = req.body;

    const baseRatePerSqft = 1200;
    const baseConstructionCost = area * baseRatePerSqft;

    let brickCost = 0;
    if (bricks === 'red') brickCost = area * 30;
    else if (bricks === 'aac') brickCost = area * 20;
    else if (bricks === 'flyash') brickCost = area * 10;

  
    let cementCost = 0;
    if (cement === 'ppc') cementCost = area * 60;
    else if (cement === 'opc') cementCost = area * 75;

 
    let flooringCost = 0;
    if (flooring === 'marble') flooringCost = area * 100;
    else if (flooring === 'wood') flooringCost = area * 80;
    else if (flooring === 'tiles') flooringCost = area * 60;

    
    let roofingCost = 0;
    if (roofing === 'rcc') roofingCost = area * 120;
    else if (roofing === 'metal') roofingCost = area * 80;
    else if (roofing === 'precast') roofingCost = area * 100;

  
    let paintCost = 0;
    if (paint === 'premium') paintCost = area * 25;
    else if (paint === 'emulsion') paintCost = area * 15;
    else if (paint === 'distemper') paintCost = area * 8;

 
    const laborMultipliers = {
      north: 1.1,
      south: 1.05,
      east: 0.95,
      west: 1.0,
    };
    const laborCost = baseConstructionCost * (laborMultipliers[laborRegion] || 1) * 0.15;

    
    let contractCost = 0;
    if (contractorType === 'outsourced') {
      contractCost = area * 50;
    }

    
    const waterTankCost = waterTank ? 25000 : 0;
    const rainHarvestCost = rainHarvest ? 15000 : 0;
    const electricalCost = electrical ? area * 20 : 0;
    const plumbingCost = plumbing ? area * 25 : 0;

    const totalCost =
      baseConstructionCost +
      brickCost +
      cementCost +
      flooringCost +
      roofingCost +
      paintCost +
      laborCost +
      contractCost +
      waterTankCost +
      rainHarvestCost +
      electricalCost +
      plumbingCost;

  
    const project = new Project({
      ...req.body,
      userId,
      brickCost,
      cementCost,
      flooringCost,
      roofingCost,
      paintCost,
      laborCost,
      contractCost,
      waterTankCost,
      rainHarvestCost,
      electricalCost,
      plumbingCost,
      totalCost,
    });

    await project.save();

    res.status(201).json({
      message: 'Project saved with cost breakdown',
      project,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Failed to save project',
      details: error.message,
    });
  }
};


const getUserProjects = async (req, res) => {
  try {
    
    const userId = req.user;
    console.log(userId)
    console.log(req.user)
    const projects = await Project.find({ userId });
    console.log(projects)
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

module.exports = {
  createProject,
  getUserProjects
};