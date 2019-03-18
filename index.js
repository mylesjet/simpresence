var app = require('electron').app
var BrowserWindow = require('electron').BrowserWindow;
const client = require('discord-rich-presence')('554461520726196234');
const {ipcMain} = require('electron');
const puppeteer = require('puppeteer');
var state = 'Connecting...'
var details = 'Connecting...'
var name = 'undefined'

 app.on('ready', function(){
    var mainWindow = new BrowserWindow({
        width: 500,
        height: 300,
        titleBarStyle: 'customButtonsOnHover',
        vibrancy: 'dark',
    })
    mainWindow.loadURL('file://' + __dirname + '/index.html')
    mainWindow.setResizable(false)
    mainWindow.on('closed', function() {
        mainWindow = null
    })
})

ipcMain.on('channel1', (e, args) => {
    name = args;
    ALFind();
})

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function() {
    if (mainWindow === null) {
        var mainWindow = new BrowserWindow({
            width: 500,
            height: 300,
            titleBarStyle: 'customButtonsOnHover',
            vibrancy: 'dark',
        })
        mainWindow.loadURL('file://' + __dirname + '/index.html')
        mainWindow.setResizable(false)
        mainWindow.on('closed', function() {
            mainWindow = null
        })
    }
})

function setActivity() {
            client.updatePresence({
              state: state,
              details: details,
              largeImageKey: 'capture',
              smallImageKey: 'prop-graphic-x2',
              instance: true,
            });
        }
    
        setInterval(function() {
            setActivity();
        }, 300);


async function ALFind() {
            try {

                const browser = await puppeteer.launch({ headless: true });
                const page = await browser.newPage();
                await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:65.0) Gecko/20100101 Firefox/65.0');
                await page.goto('https://app.projectfly.co.uk/app/#/radar');
                await page.waitFor(4000);
                const radarSearch = await page.$('.input-search');
                await radarSearch.type(name);
                const callsign = await page.evaluate(() => document.querySelector('.search-results__left > strong').textContent);
                const flight = await page.evaluate(() => document.querySelector('.search-results__left > span').textContent);
                details = callsign;
                state = flight;
            }
           
            catch(e) {
                console.log('Error', e);
            }
    }
