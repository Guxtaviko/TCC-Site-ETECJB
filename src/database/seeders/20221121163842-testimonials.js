'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Testimonials', [{
      testimonial_author: 'Raphael',
      testimonial_role: 'Pintor e Arquiteto',
      testimonial_img: 'men-3.jpg',
      testimonial_year: '2017',
      testimonial_body: 'Essa escola me preparou para a vida!',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      testimonial_author: 'Donatello',
      testimonial_role: 'Web Developer',
      testimonial_img: 'men-1.jpg',
      testimonial_year: '2018',
      testimonial_body: 'Foram os melhores 3 anos da minha adolescência!',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      testimonial_author: 'Leonardo',
      testimonial_role: 'Polímata',
      testimonial_img: 'men-4.jpg',
      testimonial_year: '2019',
      testimonial_body: 'É o que dizem, "saímos do Liceu, mas o Liceu não sai da gente"',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      testimonial_author: 'Michelangelo',
      testimonial_role: 'Engenheiro',
      testimonial_img: 'men-2.jpg',
      testimonial_year: '2016',
      testimonial_body: 'Se não fosse o Liceu, eu não seria o que sou hoje :)',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      testimonial_author: 'April',
      testimonial_role: 'Repórter',
      testimonial_img: 'woman-1.jpg',
      testimonial_year: '2014',
      testimonial_body: 'Sinto muita saudade! Aproveitem o máximo que puderem.',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Testimonials', null, {});
  }
};
