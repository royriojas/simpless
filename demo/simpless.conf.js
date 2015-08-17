module.exports = function () {
  return {
    target1: {
      files: [
        {
          src: [
            'demo.less',
            'demo-with-fns.less'
          ],
          cwd: 'demo/src/',
          dest: 'demo/dest/target1.css'
        }
      ]
    },
    target2: {
      src: 'demo/src/demo-with-fns.less',
      dest: 'demo/dest/demo-with-fns.less'
    }
  };
};
