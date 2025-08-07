const React = require('react');

const mockPdfjs = {
pdfjs: {
GlobalWorkerOptions: {
get workerSrc() {
return 'mock-worker-src';
},
set workerSrc(_) {}
},
getDocument: jest.fn(() => Promise.resolve({
numPages: 1,
getPage: jest.fn(() => Promise.resolve({
getViewport: jest.fn(() => ({ width: 100, height: 100 })),
render: jest.fn(() => Promise.resolve())
}))
})),
version: '3.0.0'
}
};

const MockComponent = (testId) => React.forwardRef((props, ref) =>
React.createElement('div', { 'data-testid': testId, ref, ...props }, props.children)
);

const Document = React.forwardRef((props, ref) => {
React.useEffect(() => {
props.onLoadSuccess?.({ numPages: 5 });
}, [props.onLoadSuccess]);

return React.createElement('div', { 'data-testid': 'mock-pdf-document', ref, ...props }, props.children);
});

module.exports = {
Document,
Page: MockComponent('mock-pdf-page'),
Outline: () => React.createElement('div', { 'data-testid': 'mock-pdf-outline' }),
Thumbnail: () => React.createElement('div', { 'data-testid': 'mock-pdf-thumbnail' }),
...mockPdfjs
};
