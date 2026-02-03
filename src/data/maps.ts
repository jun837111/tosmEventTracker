// src/data/maps.ts

const BASE_URL = import.meta.env.BASE_URL;

export interface MapData {
    episode: number;
    level: number;
    name: string;
    maxStages: number;
    isStarred: boolean;
    respawnTime: number;
    imagePath?: string;
    enName: string;
}

export const maps: MapData[] = [
    //40lv
    { episode: 1, level: 40, name: '天使波利', maxStages: 1, isStarred: false, respawnTime: 25 * 60 + 15, imagePath: `${BASE_URL}maps/XXXXXX.webp`, enName: 'xxxx' },
    { episode: 1, level: 41, name: '惡魔波利', maxStages: 1, isStarred: false, respawnTime: 25 * 60 + 15, imagePath: `${BASE_URL}maps/XXXXXX.webp`, enName: 'xxxx' },
    //60lv
    { episode: 2, level: 60, name: '黃金蟲', maxStages: 1, isStarred: false, respawnTime: 25 * 60 + 15, imagePath: `${BASE_URL}maps/XXXXXX.webp`, enName: 'xxxx' },
    { episode: 2, level: 61, name: '蟻后', maxStages: 1, isStarred: false, respawnTime: 25 * 60 + 15, imagePath: `${BASE_URL}maps/XXXXXX.webp`, enName: 'xxxx' },
    { episode: 2, level: 62, name: '哥布靈首領', maxStages: 1, isStarred: false, respawnTime: 25 * 60 + 15, imagePath: `${BASE_URL}maps/XXXXXX.webp`, enName: 'xxxx' },
    { episode: 2, level: 63, name: '海盜之王', maxStages: 1, isStarred: false, respawnTime: 25 * 60 + 15, imagePath: `${BASE_URL}maps/XXXXXX.webp`, enName: 'xxxx' },
    { episode: 2, level: 64, name: '蜂后', maxStages: 1, isStarred: false, respawnTime: 25 * 60 + 15, imagePath: `${BASE_URL}maps/XXXXXX.webp`, enName: 'xxxx' }, 
    //80lv
    { episode: 3, level: 80, name: '皮里恩', maxStages: 1, isStarred: false, respawnTime: 25 * 60 + 15, imagePath: `${BASE_URL}maps/XXXXXX.webp`, enName: 'xxxx' }, 
    { episode: 3, level: 81, name: '獸人酋長', maxStages: 1, isStarred: false, respawnTime: 25 * 60 + 15, imagePath: `${BASE_URL}maps/XXXXXX.webp`, enName: 'xxxx' },
    { episode: 3, level: 82, name: '俄塞里斯', maxStages: 1, isStarred: false, respawnTime: 25 * 60 + 15, imagePath: `${BASE_URL}maps/XXXXXX.webp`, enName: 'xxxx' },
    { episode: 3, level: 83, name: '獸人英雄', maxStages: 1, isStarred: false, respawnTime: 25 * 60 + 15, imagePath: `${BASE_URL}maps/XXXXXX.webp`, enName: 'xxxx' },
    //100lv
    { episode: 4, level: 100, name: '虎王', maxStages: 1, isStarred: false, respawnTime: 25 * 60 + 15, imagePath: `${BASE_URL}maps/XXXXXX.webp`, enName: 'xxxx' },
    { episode: 4, level: 101, name: '月夜貓', maxStages: 1, isStarred: false, respawnTime: 25 * 60 + 15, imagePath: `${BASE_URL}maps/XXXXXX.webp`, enName: 'xxxx' },
    { episode: 4, level: 102, name: '死靈', maxStages: 1, isStarred: false, respawnTime: 25 * 60 + 15, imagePath: `${BASE_URL}maps/XXXXXX.webp`, enName: 'xxxx' },
    { episode: 4, level: 103, name: '古埃及王', maxStages: 1, isStarred: false, respawnTime: 25 * 60 + 15, imagePath: `${BASE_URL}maps/XXXXXX.webp`, enName: 'xxxx' },
    //120
    { episode: 5, level: 120, name: '阿特羅斯', maxStages: 1, isStarred: false, respawnTime: 25 * 60 + 15, imagePath: `${BASE_URL}maps/XXXXXX.webp`, enName: 'xxxx' },
    { episode: 5, level: 121, name: '巴風特', maxStages: 1, isStarred: false, respawnTime: 25 * 60 + 15, imagePath: `${BASE_URL}maps/XXXXXX.webp`, enName: 'xxxx' },
    { episode: 5, level: 122, name: '德古拉男爵', maxStages: 1, isStarred: false, respawnTime: 25 * 60 + 15, imagePath: `${BASE_URL}maps/XXXXXX.webp`, enName: 'xxxx' }
    
];
