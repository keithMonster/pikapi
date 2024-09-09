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
`
export const tablePrompt = `
    这是一个table的截图，里面包含了表头信息，可能还有行信息；
    这是示例代码：${tableCode}；
    其中dataIndex为纯英文；
    按照示例代码的格式输出表头的数据，直接返回代码本身的内容；
`