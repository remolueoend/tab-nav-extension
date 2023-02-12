browser.commands.onCommand.addListener(commandHandler)

async function commandHandler(command) {
    console.debug("detected command", command)
    switch (command) {
        case "goto-prev-tab":
            return gotoPrevTab()
        case "goto-next-tab":
            return gotoNextTab()
        default:
            throw new Error(`unknown command: ${command}`)
    }
}

/**
 * Navigates to the next tab, i.e. the one on the right.
 * If the current tab is the last one, focus is moved to the first tab (index: 0)
 */
async function gotoNextTab() {
    const activeTabIndex = await getActiveTabIndex()
    return moveToTabByIndex(activeTabIndex + 1)
}

/**
 * Navigates to the previous tab, i.e. the one on the left.
 * If the current tab is the first one, focus is moved to the last tab (index: n-1)
 */
async function gotoPrevTab() {
    const activeTabIndex = await getActiveTabIndex()
    return moveToTabByIndex(activeTabIndex - 1)
}

/**
 * Returns the index of the active tab of the current window.
 */
async function getActiveTabIndex() {
    const activeTab = await queryTab({ active: true, currentWindow: true })
    return activeTab.index
}

/**
 * Moves to the tab with the given index.
 * This method applies the modulo operator to the given index,
 * therefore limiting the resulting index to the available tab indices of the current window.
 */
async function moveToTabByIndex(targetIndex) {
    const tabsCount = await getTabsCount()
    index = mod(targetIndex, tabsCount)
    console.debug(`moving to tab with index: ${index}`)
    browser.tabs.highlight({ tabs: index })
}

/**
 * Returns the number of tabs in the current window.
 */
async function getTabsCount() {
    const allTabs = await browser.tabs.query({ currentWindow: true })
    return allTabs.length
}

/**
 * Runs the given tab query and returns the first result.
 * This method throws an exception if the query result is empty.
 */
async function queryTab(query) {
    const result = await browser.tabs.query(query)
    if (result.length === 0) {
        throw new Error(`result for query is empty: ${JSON.stringify(query)}`)
    }

    return result[0]
}

/**
 * Implementation of the modulo operator.
 */
function mod(n, m) {
    return ((n % m) + m) % m
}