<script>

</script>

<style>
  .overflow {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 110px;
    height: 147px;
    position: absolute;
  }
</style>

<div class="overflow">
  <slot>
    <em>no tasks</em>
  </slot>
</div>
