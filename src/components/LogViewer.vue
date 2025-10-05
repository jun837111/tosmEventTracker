<template>
  <el-card v-if="isAdmin" class="log-viewer">
    <template #header>
      <div class="card-header">
        <span>活動記錄 (最近48小時)</span>
        <el-button size="small" @click="refreshLogs">刷新</el-button>
      </div>
    </template>
    <div v-if="logs.length === 0" class="no-logs">
      沒有活動記錄
    </div>
    <div v-else class="log-list">
      <div
        v-for="log in sortedLogs"
        :key="log.id"
        class="log-item"
        :class="`log-${log.action}`"
      >
        <div class="log-time">{{ formatLogTime(log.timestamp) }}</div>
        <div class="log-content">
          <span class="log-user">{{ formatUserId(log.userId) }}</span>
          <span class="log-action">{{ formatAction(log.action) }}</span>
          <span class="log-note">{{ log.noteInfo }}</span>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { Loading } from '@element-plus/icons-vue';
import { useFirebaseLogs } from '../composables/useFirebaseLogs';
import { getUserId } from '../utils/userUtils';

const { logs, getRecentLogs, initLogsListener } = useFirebaseLogs();

// Check if current user is admin
const isAdmin = computed(() => {
  const adminUid = import.meta.env.VITE_ADMIN_UID;
  const currentUid = getUserId();
  return adminUid && currentUid === adminUid;
});

const sortedLogs = computed(() => {
  return [...logs.value].sort((a, b) => b.timestamp - a.timestamp);
});

const refreshLogs = async () => {
  try {
    const recentLogs = await getRecentLogs();
    logs.value = recentLogs;
  } catch (error) {
    console.error('Failed to load logs:', error);
  }
};

const formatLogTime = (timestamp: number) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - timestamp;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);

  if (diffMins < 1) {
    return '剛剛';
  } else if (diffMins < 60) {
    return `${diffMins} 分鐘前`;
  } else if (diffHours < 24) {
    return `${diffHours} 小時前`;
  } else {
    return date.toLocaleString('zh-TW', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
};

const formatUserId = (userId: string) => {
  // Shorten the UID for display
  const parts = userId.split('_');
  if (parts.length >= 3) {
    return `${parts[0]}_${parts[2]}`;
  }
  return userId;
};

const formatAction = (action: string) => {
  const actionMap: Record<string, string> = {
    added: '新增',
    updated: '更新',
    deleted: '刪除',
  };
  return actionMap[action] || action;
};

onMounted(() => {
  if (isAdmin.value) {
    initLogsListener();
  }
});
</script>

<style scoped>
.log-viewer {
  margin-top: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.log-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 20px;
  color: var(--el-text-color-secondary);
}

.no-logs {
  text-align: center;
  padding: 20px;
  color: var(--el-text-color-secondary);
}

.log-list {
  max-height: 400px;
  overflow-y: auto;
}

.log-item {
  display: flex;
  gap: 12px;
  padding: 10px;
  border-bottom: 1px solid var(--el-border-color-lighter);
  transition: background-color 0.2s;
}

.log-item:hover {
  background-color: var(--el-fill-color-light);
}

.log-item:last-child {
  border-bottom: none;
}

.log-time {
  flex-shrink: 0;
  width: 80px;
  font-size: 12px;
  color: var(--el-text-color-secondary);
}

.log-content {
  flex: 1;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
}

.log-user {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  font-family: monospace;
}

.log-action {
  font-weight: bold;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.log-added .log-action {
  background-color: var(--el-color-success-light-9);
  color: var(--el-color-success);
}

.log-updated .log-action {
  background-color: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}

.log-deleted .log-action {
  background-color: var(--el-color-danger-light-9);
  color: var(--el-color-danger);
}

.log-note {
  color: var(--el-text-color-primary);
}

@media (max-width: 768px) {
  .log-item {
    flex-direction: column;
    gap: 4px;
  }

  .log-time {
    width: auto;
  }
}
</style>
