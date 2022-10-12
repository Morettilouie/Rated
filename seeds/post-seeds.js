const { Post } = require('../models');

const postdata = [
  {
    title: 'Transformers',
    content: 'Optimus Prime is my hero!',
    user_id: 10
  },
  {
    title: 'Blink182',
    content: 'This is the best band ever',
    user_id: 8
  },
  {
    title: 'Pineapple on pizza',
    content: "I'd rather starve to death",
    user_id: 1
  },{
    title: 'Nunc purus.',
    content: 'desdev.cn/enim/blandit/mi',
    user_id: 4
  },
  {
    title: 'Pellentesque eget nunc.',
    content: 'google.ca/nam/nulla/integer',
    user_id: 7
  },
  {
    title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    content: 'stanford.edu/consequat',
    user_id: 4
  },
  {
    title: 'In hac habitasse platea dictumst.',
    content: 'edublogs.org/non/ligula/pellentesque',
    user_id: 1
  },
  {
    title: 'Morbi non quam nec dui luctus rutrum.',
    content: 'ucla.edu/consequat/nulla.html',
    user_id: 1
  },
  {
    title: 'Duis ac nibh.',
    content: 'theguardian.com/dui/vel/nisl/duis/ac/nibh',
    user_id: 9
  },
  {
    title: 'Curabitur at ipsum ac tellus semper interdum.',
    content: 'reverbnation.com/ligula/sit.jpg',
    user_id: 5
  },
  {
    title: 'In hac habitasse platea dictumst.',
    content: 'china.com.cn/lectus/vestibulumon',
    user_id: 3
  },
  {
    title: 'Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.',
    content: 'networksolutions.com/nam/ultrices/libero/non/mattis/pulvinaron',
    user_id: 10
  },
  {
    title: 'Donec dapibus.',
    content: 'instagram.com/ac/neque/duis/bibendum/morbi/non.xml',
    user_id: 8
  },
  {
    title: 'Nulla tellus.',
    content: 'lycos.com/natoque/penatibus/et.html',
    user_id: 3
  },
  {
    title: 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.',
    content: 'gmpg.org/lorem.jpg',
    user_id: 3
  },
  {
    title:
      'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam.',
    content: 'paginegialle.it/mattis/egestasp',
    user_id: 7
  },
  {
    title: 'In hac habitasse platea dictumst.',
    content: 'wikia.com/turpis/eget.jpg',
    user_id: 6
  },
  {
    title: 'Etiam justo.',
    content: 'shareasale.com/quison',
    user_id: 4
  },
  {
    title: 'Nulla ut erat id mauris vulputate elementum.',
    content: 'java.com/diam/neque/vestibulum/eget/vulputate/ut/ultrices',
    user_id: 6
  },
  {
    title: 'Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
    content: 'java.com/at/nibh/in',
    user_id: 7
  }
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;
