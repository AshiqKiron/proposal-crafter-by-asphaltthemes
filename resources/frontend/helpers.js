export function getElements($scope, selectors = {}) {
    return Object.entries(selectors).reduce((acc, [key, value]) => {
        acc[`$${key}`] = $scope.find(value);
        return acc;
    }, {});
}