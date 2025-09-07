import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

// seed-data.ts
const areas = [
  { _id: '1', name: 'New Cairo' },
  { _id: '2', name: '6th of October' },
  { _id: '3', name: 'Sheikh Zayed' },
  { _id: '4', name: 'North Coast' },
  { _id: '5', name: 'New Capital' },
];

const projects = [
  {
    _id: '1',
    name: 'Zomoroda',
  },
  {
    _id: '2',
    name: 'Mirage',
  },
  {
    _id: '3',
    name: 'Palms',
  },
  {
    _id: '4',
    name: 'ElNaseem',
  },
  {
    _id: '5',
    name: 'Telal',
  },
];

const developers = [
  {
    _id: '1',
    name: 'Palm Hills',
    image_url: 'http://backend:4000/uploads/developers/palmhills.png',
  },
  {
    _id: '2',
    name: 'Mountain View',
    image_url: 'http://backend:4000/uploads/developers/mv.png',
  },
  {
    _id: '3',
    name: 'Emaar Misr',
    image_url: 'http://backend:4000/uploads/developers/emaar.jpg',
  },
  {
    _id: '4',
    name: 'Sodic',
    image_url: 'http://backend:4000/uploads/developers/sodic.jpg',
  },
  {
    _id: '5',
    name: 'Orascom',
    image_url: 'http://backend:4000/uploads/developers/orascom.png',
  },
];

const generateUnits = () => {
  const units = [];
  for (let i = 1; i <= 100; i++) {
    const dev = developers[Math.floor(Math.random() * developers.length)];
    const area = areas[Math.floor(Math.random() * areas.length)];
    const project = projects[Math.floor(Math.random() * projects.length)];
    const unitsAreas = [80, 90, 100, 120, 150, 180, 200, 250];
    const bedrooms = Array.from({ length: 4 }, (_, idx) => idx + 1);
    const bathrooms = Array.from({ length: 3 }, (_, idx) => idx + 1);
    const downPayments = [5, 10, 15, 20];

    const images = [
      'http://backend:4000/uploads/units/1.jpg',
      'http://backend:4000/uploads/units/2.jpg',
      'http://backend:4000/uploads/units/3.jpg',
      'http://backend:4000/uploads/units/4.jpg',
      'http://backend:4000/uploads/units/5.jpg',
    ];

    units.push({
      name: `${dev.name} Unit ${i}`,
      description: `A modern unit #${i} in ${area.name}`,
      coordinates: [31.2 + Math.random(), 30.0 + Math.random()],
      unit_area: unitsAreas[Math.floor(Math.random() * unitsAreas.length)],
      area_id: area._id,
      area_name: area.name,
      bedrooms: bedrooms[Math.floor(Math.random() * bedrooms.length)],
      bathrooms: bathrooms[Math.floor(Math.random() * bathrooms.length)],
      project_id: project._id,
      project_name: project.name,
      developer_id: dev._id,
      developer_name: dev.name,
      developer_img_url: dev.image_url,
      price: Math.floor(Math.random() * 5000000) + 1000000,
      payment_plans: [
        {
          down_payment:
            downPayments[Math.floor(Math.random() * downPayments.length)],
          installments: 36,
          installment_amount: Math.floor(Math.random() * 10000) + 10000,
        },
        {
          down_payment:
            downPayments[Math.floor(Math.random() * downPayments.length)],
          installments: 60,
          installment_amount: Math.floor(Math.random() * 10000) + 10000,
        },
      ],
      images: images.sort(() => 0.5 - Math.random()),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  return units;
};

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async onModuleInit() {
    const db = this.connection.db;

    console.log('Seeding database...');

    await db.collection('areas').deleteMany({});
    await db.collection('projects').deleteMany({});
    await db.collection('developers').deleteMany({});
    await db.collection('units').deleteMany({});

    //@ts-ignore
    await db.collection('areas').insertMany(areas);
    //@ts-ignore
    await db.collection('projects').insertMany(projects);
    //@ts-ignore
    await db.collection('developers').insertMany(developers);
    await db.collection('units').insertMany(generateUnits());

    console.log('Database seeded');
  }
}
