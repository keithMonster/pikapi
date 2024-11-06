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
    key: 'nickname',
    label: '好友昵称',
    type: 'Input',
    props: {
      placeholder: '请输入好友昵称',
      allowClear: true,
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
    key: 'qualityType',
    label: '质检项类型',
    type: 'Select',
    props: {
      placeholder: '选择质检项类型（可多选）',
      allowClear: true,
      mode: 'multiple',
      options: Quality.allType.map((item) => ({
        value: item.key,
        label: item.name
      }))
    }
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
  {
    key: 'addTime',
    label: '添加时间',
    type: 'RangePicker',
    // defaultValue: [defaultParams.startTime, defaultParams.endTime],
    props: {
      valueFormat: 'YYYY-MM-DD',
      placeholder: ['开始时间', '结束时间'],
      allowClear: false,
    },
  },
];
`;
export const filterPrompt = `
    这是一个筛选器的截图，里面包含了筛选项信息；
    这是示例代码：${filterSchema}；
    按照示例代码的格式输出筛选项数据，直接返回代码本身的内容；
`;
