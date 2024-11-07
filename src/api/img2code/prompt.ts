const tableCode = `
export const columns: any[] = [
    {
        title: '好友',
        dataIndex: 'nickname',
        
    },
    {
        title: '归属员工',
        dataIndex: 'userName',
    },
    {
        title: '归属员工部门',
        dataIndex: 'department',
    },
    {
        title: '标签',
        dataIndex: 'tags',
    },
    {
        title: '添加方式',
        dataIndex: 'addType',
    },
    {
        title: '添加时间',
        dataIndex: 'addTime',
    },
];
`;
export const tablePrompt = `
    这是一个table的截图，里面包含了表头信息，可能还有行信息；
    这是示例代码：${tableCode}；
    其中dataIndex为纯英文；
    按照示例代码的格式输出表头的数据，直接返回代码本身的内容；
`;

export const filterSchema = `
export filterSchema:any[] = [
  {
    key: 'input',
    label: '输入框',
    type: 'Input',
    props: {
      placeholder: '请输入',
      allowClear: true,
    },
  },
   {
    key: 'select',
    label: '下拉选择器',
    type: 'Select',
    props: {
      placeholder: '请选择',
      allowClear: true,
      mode: 'multiple',
      options: [{
        value: 1,
        label: 1
      },{
        value: 2,
        label: 2
      }]
    }
  },
  {
    key: 'DatePicker',
    label: '日期选择器',
    type: 'DatePicker',
    defaultValue: dayjs(),
    props: {
      showTime: true,
      placeholder: '请选择日期',
      ranges: {
        今天: dayjs(),
        昨天: dayjs().subtract(1, 'day')
      }
    }
  },
  {
    key: 'rangePicker',
    label: '时间范围选择器',
    type: 'RangePicker',
    props: {
      valueFormat: 'YYYY-MM-DD',
      placeholder: ['开始时间', '结束时间'],
      allowClear: false,
    },
  },
  {
    key: 'userIds',
    label: '选择员工',
    type: 'OrganizationPicker',
    props: {
      placeholder: '请选择员工',
      showHasLeave: true,
      menuCode: 'm1_customerManage',
      multiple: true,
      filterType: ['org'],
      maxTagCount: 1,
      config: bizConfig,
    },
  },
  {
    label: '好友标签',
    key: 'tagIds',
    type: 'TagPicker',
    modelKey: 'selectTagList',
    defaultValue: [],
    props: {
      placeholder: '请选择好友标签',
      config: bizConfig,
      tagType: ['qw'],
      apiParams: {
        qw: { friend_type: '00000000-0000-0000-0000-000000000000' },
        biz: {},
        company: { types: 'company' },
        chatroom: { types: 'chatroom' },
        strategy: {},
        companyTag: {},
      },
    },
  },
];
`;
export const filterPrompt = `
    这是一个筛选器的截图，里面包含了筛选项信息；
    每个筛选项分为两个部分，前面是lable，描述了该筛选项的信息，后面是输入框，代表不同的输入类型；
    输入类型有基础类型和特殊类型；
    基础类型有：输入框、下拉选择器(输入框后面会有向下的小三角)、时间选择器、时间范围选择器，需要根据前面的文字信息和输入框内的placeholder判断基础类型；
    特殊的类型有：员工选择器，标签选择器，也需要根据前面的文字信息判断基础类型；
    这是示例代码：${filterSchema}；
    按照示例代码的格式输出筛选项数据，直接返回代码本身的内容；
`;
